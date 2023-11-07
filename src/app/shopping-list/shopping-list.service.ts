import { Injectable } from '@angular/core';
import { Model, ShoppingList } from '../shared/shared.model';
import { Database, get, object, ref, set } from '@angular/fire/database';
import { format, Unit } from '../shared/unit';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingList$: Observable<ShoppingList> = object(ref(this.database, 'shoppingList')).pipe(
    map(queryChange => queryChange.snapshot.val() as ShoppingList)
  );

  constructor(readonly database: Database) { }

  /**
   * Create a shopping list from the current plan.
   */
  async createShoppingList(): Promise<void> {
    const plan = (await get(ref(this.database, 'plan'))).val() as Model['plan'];
    const meals = (await get(ref(this.database, 'meals'))).val() as Model['meals'];
    const ingredients = (await get(ref(this.database, 'ingredients'))).val() as Model['ingredients'];
    const personCount = (await get(ref(this.database, 'persons'))).size;
    const quantitiesByCategoryAndIngredient: { [unit: string]: { [ingredientId: string]: number } } = {};
    const shoppingList: ShoppingList = {};

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
          shoppingList[category] = [];
        }

        const quantity = quantitiesByCategoryAndIngredient[unit][ingredientId];
        const name = ingredient.name;
        const text = `${name}: ${format(quantity, unit as Unit)}`;
        shoppingList[category].push({ text, checked: false });
      }
    }

    // Sort the shopping list entries alphabetically.
    for (const category in shoppingList) {
      shoppingList[category].sort((a, b) => a.text.localeCompare(b.text));
    }

    // Save the shopping list into the database.
    await set(ref(this.database, 'shoppingList'), shoppingList);
  }
}
