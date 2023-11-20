import { Injectable } from '@angular/core';
import { Database, get, object, ref, remove, set } from '@angular/fire/database';
import { combineLatest, map, Observable } from 'rxjs';
import { Plan } from './plan.model';
import { averageRatings } from '../shared/rating';
import { Model } from '../shared/shared.model';
import { format, Unit } from '../shared/unit';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plan$: Observable<Plan> = this.getPlan$();

  constructor(readonly database: Database) { }

  setPlanName(name: string): Promise<void> {
    return set(ref(this.database, 'plan/name'), name);
  }

  removeMeal(index: number): Promise<void> {
    return remove(ref(this.database, 'plan/meals/' + index));
  }

  async addMeal(mealId: string): Promise<void> {
    const planMealCount = (await get(ref(this.database, 'plan/meals'))).size;
    return set(ref(this.database, 'plan/meals/' + planMealCount), mealId);
  }

  /**
   * Create a shopping list from the current plan.
   */
  async createShoppingList(): Promise<void> {
    const plan = (await get(ref(this.database, 'plan'))).val() as Model['plan'];
    const meals = (await get(ref(this.database, 'meals'))).val() as Model['meals'];
    const ingredients = (await get(ref(this.database, 'ingredients'))).val() as Model['ingredients'];
    const personCount = (await get(ref(this.database, 'persons'))).size;
    const quantitiesByCategoryAndIngredient: { [unit: string]: { [ingredientId: string]: number } } = {};
    const shoppingList: Model['shoppingList'] = {};

    // Aggregate the quantities for each pair of unit and ingredient.
    for (const mealId of plan.meals) {
      const meal = meals[mealId];
      const ratio = meal.yield / personCount;
      for (const ingredientId in meal.ingredients) {
        const { quantity, scalable, unit } = meal.ingredients[ingredientId];
        if (!quantitiesByCategoryAndIngredient[unit]) {
          quantitiesByCategoryAndIngredient[unit] = {};
        }
        if (!quantitiesByCategoryAndIngredient[unit][ingredientId]) {
          quantitiesByCategoryAndIngredient[unit][ingredientId] = 0;
        }
        quantitiesByCategoryAndIngredient[unit][ingredientId] += scalable ? ratio * quantity : quantity;
      }
    }

    // Create the shopping list from the aggregated quantities.
    for (const unit in quantitiesByCategoryAndIngredient) {
      for (const ingredientId in quantitiesByCategoryAndIngredient[unit]) {
        const ingredient = ingredients[ingredientId];
        const category = ingredient.category;

        if (shoppingList[category] === undefined) {
          shoppingList[category] = {};
        }

        const quantity = quantitiesByCategoryAndIngredient[unit][ingredientId];
        const name = ingredient.name;
        const text = `${name} ${format(quantity, unit as Unit)}`;
        const key = Object.keys(shoppingList[category]).length;
        shoppingList[category][key] = { text, checked: false };
      }
    }

    // Sort the shopping list entries alphabetically.
    // for (const category in shoppingList) {
    //   shoppingList[category].sort((a, b) => a.text.localeCompare(b.text));
    // }

    // Save the shopping list into the database.
    await set(ref(this.database, 'shoppingList'), shoppingList);
  }

  private getPlan$(): Observable<Plan> {
    return combineLatest([
      object(ref(this.database, 'plan')).pipe(
        map(plan => plan.snapshot.val() as Model['plan'])
      ),
      object(ref(this.database, 'meals')).pipe(
        map(meals => meals.snapshot.val() as Model['meals'])
      ),
      object(ref(this.database, 'persons')).pipe(
        map(persons => persons.snapshot.val() as Model['persons'])
      )
    ]).pipe(
      map(([plan, meals, persons]) => {
        return {
          name: plan.name,
          meals: plan.meals.map(mealKey => {
            const meal = meals[mealKey];
            const ratings = Object.keys(persons).map(personKey => meal.ratings[personKey] ?? 3);
            return {
              name: meal.name,
              description: meal.description,
              price: meal.price,
              rating: averageRatings(ratings)
            }
          })
        };
      })
    );
  }
}
