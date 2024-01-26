import { Injectable } from '@angular/core';
import { Ingredient, IngredientList } from '../models/ingredient.model';
import { Database, get, ref, update } from '@angular/fire/database';
import { Meal } from '../models/meal.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DatabaseCollection } from './database/database-collection';
import { ingredientSchema } from './database/ingredient.schema';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends DatabaseCollection<Ingredient> {
  constructor(database: Database) {
    super(database, 'ingredients', ingredientSchema);
  }

  getIngredientList$(): Observable<IngredientList> {
    return this.getAll$().pipe(
      map((ingredients) =>
        Object.entries(ingredients)
          .map(([key, ingredient]) => ({ key, ...ingredient }))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  override async remove(key: string): Promise<void> {
    // Delete the ingredient as well as all references to it in all meals in one transaction.
    const meals = (await get(ref(this.database, 'meals'))).val() as Record<string, Meal>;
    const mealIngredientPaths = Object.entries(meals).flatMap(([mealKey, meal]) =>
      Object.entries(meal.ingredients)
        .filter((entry) => key === entry[1].ingredientKey)
        .map((entry) => `meals/${mealKey}/ingredients/${entry[0]}`)
    );
    const paths = [...mealIngredientPaths, `ingredients/${key}`];
    return await update(ref(this.database), Object.fromEntries(paths.map((path) => [path, null])));
  }
}
