import { inject, Injectable } from '@angular/core';
import { Database, object, push, ref, remove, set, update } from '@angular/fire/database';
import { ShoppingList, ShoppingListItem } from '../models/shopping-list.model';
import { units } from '../models/unit.model';
import { map, Observable } from 'rxjs';
import { CategoryKey } from '../models/category.model';
import { PlanService } from './plan.service';
import { MealService } from './meal.service';
import { IngredientService } from './ingredient.service';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  readonly rootPath = 'shoppingList';
  readonly database = inject(Database);
  readonly planService = inject(PlanService);
  readonly mealService = inject(MealService);
  readonly ingredientService = inject(IngredientService);
  readonly personService = inject(PersonService);

  get$(): Observable<ShoppingList> {
    return object(ref(this.database, this.rootPath)).pipe(map((queryChange) => queryChange.snapshot.val()));
  }

  async removeItem(categoryKey: string, itemKey: string): Promise<void> {
    return remove(ref(this.database, this.itemPath(categoryKey, itemKey)));
  }

  async addItem(categoryKey: CategoryKey, item: ShoppingListItem): Promise<void> {
    return push(ref(this.database, 'shoppingList/' + categoryKey), item).then();
  }

  async updateItem(categoryKey: string, itemKey: string, item: Partial<ShoppingListItem>): Promise<void> {
    return update(ref(this.database, this.itemPath(categoryKey, itemKey)), item);
  }

  async createFromPlan(): Promise<void> {
    const plan = await this.planService.get();
    const meals = await this.mealService.getAll();
    const ingredients = await this.ingredientService.getAll();
    const personCount = await this.personService.size();
    const quantitiesByUnitAndIngredient: {
      [unit: string]: { [ingredientId: string]: number };
    } = {};
    const shoppingList: ShoppingList = {};

    // Aggregate the quantities for each pair of unit and ingredient.
    for (const mealId of Object.values(plan.meals)) {
      const meal = meals[mealId];
      const ratio = meal.servings / personCount;
      for (const ingredient of Object.values(meal.ingredients)) {
        const { quantity, scaleServings, unit } = ingredient;
        if (!quantitiesByUnitAndIngredient[unit]) {
          quantitiesByUnitAndIngredient[unit] = {};
        }
        if (!quantitiesByUnitAndIngredient[unit][ingredient.ingredient]) {
          quantitiesByUnitAndIngredient[unit][ingredient.ingredient] = 0;
        }
        quantitiesByUnitAndIngredient[unit][ingredient.ingredient] += scaleServings ? ratio * quantity : quantity;
      }
    }

    // Create the shopping list from the aggregated quantities.
    for (const [unitKey, unit] of Object.entries(units)) {
      for (const ingredientKey in quantitiesByUnitAndIngredient[unitKey] ?? {}) {
        const ingredient = ingredients[ingredientKey];
        const category = ingredient.category;

        if (shoppingList[category] === undefined) {
          shoppingList[category] = {};
        }

        const quantity = quantitiesByUnitAndIngredient[unitKey][ingredientKey];
        const name = ingredient.name;
        const text = `${name} ${unit.formatter(quantity)}`;
        const key = Object.keys(shoppingList[category]).length;
        shoppingList[category][key] = { text, checked: false };
      }
    }

    // Save the shopping list into the database.
    await set(ref(this.database, this.rootPath), shoppingList);
  }

  private categoryPath(categoryKey: string): string {
    return `${this.rootPath}/${categoryKey}`;
  }

  private itemPath(categoryKey: string, itemKey: string): string {
    return `${this.categoryPath(categoryKey)}/${itemKey}`;
  }
}
