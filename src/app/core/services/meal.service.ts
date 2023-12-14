import { Injectable } from '@angular/core';
import { Meal, MealIngredient } from '../models/meal.model';
import { Repository } from './repository';
import { get, push, ref, remove, set, update } from '@angular/fire/database';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealService extends Repository<Meal> {

  constructor() {
    super('meals');
  }

  override async remove(mealKey: string): Promise<void> {
    // Delete the meal as well as all references to it in the plan in one transaction.
    const meals = (await get(ref(this.database, 'plan/meals'))).val() as Plan['meals'];
    const keys = Object.entries(meals)
      .filter(([_, key]) => mealKey === key)
      .map(([key, _]) => key);
    const paths = [...keys.map(key => `plan/meals/${key}`), `meals/${mealKey}`];
    return await update(
      ref(this.database),
      Object.fromEntries(paths.map(path => [path, null]))
    );
  }

  async addIngredient(mealKey: string, ingredient: MealIngredient): Promise<void> {
    return push(ref(this.database, this.ingredientsRootPath(mealKey)), ingredient).then();
  }

  async removeIngredient(mealKey: string, ingredientKey: string): Promise<void> {
    return remove(ref(this.database, this.ingredientPath(mealKey, ingredientKey)));
  }

  async updateIngredient(mealKey: string, ingredientKey: string, ingredient: Partial<MealIngredient>): Promise<void> {
    return update(ref(this.database, this.ingredientPath(mealKey, ingredientKey)), ingredient);
  }

  private ingredientsRootPath(mealKey: string): string {
    return `${this.path(mealKey)}/ingredients`;
  }

  private ingredientPath(mealKey: string, ingredientKey: string): string {
    return `${this.ingredientsRootPath(mealKey)}/${ingredientKey}`;
  }
}
