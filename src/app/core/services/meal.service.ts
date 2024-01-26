import { inject, Injectable } from '@angular/core';
import { Meal, MealIngredient, MealList, MealWithIngredients } from '../models/meal.model';
import { Database, get, ref, update } from '@angular/fire/database';
import { PlannedMeal } from '../models/plan.model';
import { DatabaseCollection } from './database/database-collection';
import { mealIngredientSchema, mealSchema } from './database/meal.schema';
import { Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class MealService extends DatabaseCollection<Meal> {
  ingredientService = inject(IngredientService);

  constructor(database: Database) {
    super(database, 'meals', mealSchema);
  }

  getMealList$(): Observable<MealList> {
    return this.getAll$().pipe(
      map((meals) =>
        Object.entries(meals)
          .map(([key, meal]) => ({ key, ...meal }))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  getMealWithIngredients$(key: string): Observable<MealWithIngredients | undefined> {
    return this.get$(key).pipe(
      switchMap((meal) => {
        if (meal === undefined) {
          return of(undefined);
        }

        return this.ingredientService.getAll$().pipe(
          map((ingredients) => ({
            ...meal,
            key,
            ingredients: Object.entries(meal.ingredients).map(([key2, ingredient]) => ({
              key: key2,
              ...ingredient,
              ingredient: { key: ingredient.ingredientKey, name: ingredients[ingredient.ingredientKey].name }
            }))
          }))
        );
      })
    );
  }

  override async remove(mealKey: string): Promise<void> {
    // Delete the meal as well as all references to it in the plan in one transaction.
    const meals = (await get(ref(this.database, 'plan'))).val() as Record<string, PlannedMeal>;
    const keys = Object.entries(meals)
      .filter((entry) => mealKey === entry[1].mealKey)
      .map((entry) => entry[0]);
    const paths = [...keys.map((key) => `plan/${key}`), `meals/${mealKey}`];
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

  private ingredients(mealKey: string): DatabaseCollection<MealIngredient> {
    return new DatabaseCollection(this.database, `meals/${mealKey}/ingredients`, mealIngredientSchema);
  }
}
