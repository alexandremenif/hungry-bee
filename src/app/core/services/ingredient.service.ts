import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Database, get, ref, update } from '@angular/fire/database';
import { Meal } from '../models/meal.model';
import { Collection } from '../utilities/collection';
import { ingredientSchema } from '../schemas/ingredient.schema';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends Collection<Ingredient> {
  constructor(database: Database) {
    super(database, 'ingredients', ingredientSchema);
  }

  override async remove(key: string): Promise<void> {
    // Delete the ingredient as well as all references to it in all meals in one transaction.
    const meals = (await get(ref(this.database, 'meals'))).val() as Record<string, Meal>;
    const mealIngredientPaths = Object.entries(meals).flatMap(([mealKey, meal]) =>
      Object.entries(meal.ingredients ?? {})
        .filter((entry) => key === entry[1].ingredient)
        .map((entry) => `meals/${mealKey}/ingredients/${entry[0]}`)
    );
    const paths = [...mealIngredientPaths, `ingredients/${key}`];
    return await update(ref(this.database), Object.fromEntries(paths.map((path) => [path, null])));
  }
}
