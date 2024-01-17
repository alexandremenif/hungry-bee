import { Injectable } from '@angular/core';
import { Meal, MealIngredient } from '../models/meal.model';
import { Database, get, ref, update } from '@angular/fire/database';
import { Plan } from '../models/plan.model';
import { mealIngredientSchema, mealSchema } from '../schemas/meal.schema';
import { Collection } from './collection';
import { Schema } from 'zod';

@Injectable({
  providedIn: 'root'
})
export class MealService extends Collection<Meal> {
  constructor(database: Database) {
    super(database, 'meals', mealSchema as Schema<Meal>);
  }

  override async remove(mealKey: string): Promise<void> {
    // Delete the meal as well as all references to it in the plan in one transaction.
    const meals = (await get(ref(this.database, 'plan/meals'))).val() as Plan['meals'];
    const keys = Object.entries(meals)
      .filter((entry) => mealKey === entry[1].mealKey)
      .map((entry) => entry[0]);
    const paths = [...keys.map((key) => `plan/meals/${key}`), `meals/${mealKey}`];
    return await update(ref(this.database), Object.fromEntries(paths.map((path) => [path, null])));
  }

  async addIngredient(mealKey: string, ingredient: MealIngredient): Promise<string | null> {
    return this.ingredients(mealKey).add(ingredient);
  }

  async removeIngredient(mealKey: string, ingredientKey: string): Promise<void> {
    return this.ingredients(mealKey).remove(ingredientKey);
  }

  async updateIngredient(mealKey: string, ingredientKey: string, ingredient: Partial<MealIngredient>): Promise<void> {
    return this.ingredients(mealKey).update(ingredientKey, ingredient);
  }

  private ingredients(mealKey: string): Collection<MealIngredient> {
    return new Collection(this.database, `meals/${mealKey}/ingredients`, mealIngredientSchema);
  }
}
