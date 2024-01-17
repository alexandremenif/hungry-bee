import { inject, Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { ShoppingListItem } from '../models/shopping-list.model';
import { formatUnit, Unit } from '../models/unit.model';
import { PlanService } from './plan.service';
import { MealService } from './meal.service';
import { IngredientService } from './ingredient.service';
import { Collection } from './collection';
import { shoppingListItemSchema } from '../schemas/shopping-list.schema';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends Collection<ShoppingListItem> {
  readonly planService = inject(PlanService);
  readonly mealService = inject(MealService);
  readonly ingredientService = inject(IngredientService);

  constructor(database: Database) {
    super(database, 'shoppingList', shoppingListItemSchema);
  }

  async createFromPlan(): Promise<void> {
    const plan = await this.planService.get();
    const meals = await this.mealService.getAll();
    const ingredients = await this.ingredientService.getAll();
    const quantitiesByUnitAndIngredient: Map<Unit, Map<string, number>> = new Map();

    // Clear the shopping list.
    await this.clear();

    // Aggregate the quantities for each pair of unit and ingredient.
    for (const plannedMeal of Object.values(plan.meals)) {
      const meal = meals[plannedMeal.mealKey];
      const ratio = plannedMeal.servings / meal.servings;
      for (const ingredient of Object.values(meal.ingredients)) {
        const { quantity, scaleServings, unit } = ingredient;

        let quantitiesByIngredient = quantitiesByUnitAndIngredient.get(unit);

        if (quantitiesByIngredient === undefined) {
          quantitiesByIngredient = new Map();
          quantitiesByUnitAndIngredient.set(unit, quantitiesByIngredient);
        }

        const accQuantity = quantitiesByIngredient.get(ingredient.ingredientKey) ?? 0;

        quantitiesByIngredient.set(
          ingredient.ingredientKey,
          accQuantity + (scaleServings ? ratio * quantity : quantity)
        );
      }
    }

    // Create the shopping list from the aggregated quantities.
    for (const [unit, quantitiesByIngredient] of quantitiesByUnitAndIngredient.entries()) {
      for (const [ingredientKey, quantity] of quantitiesByIngredient.entries()) {
        const ingredient = ingredients[ingredientKey];
        const category = ingredient.category;
        const name = ingredient.name;
        const entry = `${name} ${formatUnit(quantity, unit)}`;
        await this.add({ category, entry, done: false });
      }
    }
  }

  async clear(): Promise<void> {
    return set(ref(this.database, this.path), {});
  }
}
