import { inject, Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { ShoppingList, ShoppingListItem } from '../models/shopping-list.model';
import { units } from '../models/unit.model';
import { CategoryKey } from '../models/category.model';
import { PlanService } from './plan.service';
import { MealService } from './meal.service';
import { IngredientService } from './ingredient.service';
import { Node } from '../utilities/node';
import { Collection } from '../utilities/collection';
import { shoppingListItemSchema, shoppingListSchema } from '../schemas/shopping-list.schema';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends Node<ShoppingList> {
  readonly planService = inject(PlanService);
  readonly mealService = inject(MealService);
  readonly ingredientService = inject(IngredientService);

  constructor(database: Database) {
    super(database, 'shoppingList', shoppingListSchema, () => ({}));
  }

  async removeItem(categoryKey: string, itemKey: string): Promise<void> {
    return this.items(categoryKey).remove(itemKey);
  }

  async addItem(categoryKey: CategoryKey, item: ShoppingListItem): Promise<string | null> {
    return this.items(categoryKey).add(item);
  }

  async updateItem(categoryKey: string, itemKey: string, item: Partial<ShoppingListItem>): Promise<void> {
    return this.items(categoryKey).update(itemKey, item);
  }

  async createFromPlan(): Promise<void> {
    const plan = await this.planService.get();
    const meals = await this.mealService.getAll();
    const ingredients = await this.ingredientService.getAll();
    const quantitiesByUnitAndIngredient: {
      [unit: string]: { [ingredientId: string]: number };
    } = {};
    const shoppingList: ShoppingList = {};

    // Aggregate the quantities for each pair of unit and ingredient.
    for (const plannedMeal of Object.values(plan.meals ?? {})) {
      const meal = meals[plannedMeal.meal];
      const ratio = plannedMeal.servings / meal.servings;
      for (const ingredient of Object.values(meal.ingredients ?? {})) {
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
        const key = `_${Object.keys(shoppingList[category]).length}`;
        shoppingList[category][key] = { text, checked: false };
      }
    }

    // Save the shopping list into the database.
    await set(ref(this.database, this.path), shoppingList);
  }

  private items(categoryKey: string): Collection<ShoppingListItem> {
    return new Collection(this.database, `${this.path}/${categoryKey}`, shoppingListItemSchema);
  }
}
