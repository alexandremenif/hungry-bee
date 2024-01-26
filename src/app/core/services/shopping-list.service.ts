import { inject, Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { formatUnit, Unit } from '../models/unit.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { categories } from '../models/category.model';
import { ShoppingList, ShoppingListItem } from '../models/shopping-list.model';
import { DatabaseCollection } from './database/database-collection';
import { IngredientService } from './ingredient.service';
import { MealService } from './meal.service';
import { PlanService } from './plan.service';
import { shoppingListItemSchema } from './database/shopping-list.schema';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends DatabaseCollection<ShoppingListItem> {
  private readonly planService = inject(PlanService);
  private readonly mealService = inject(MealService);
  private readonly ingredientService = inject(IngredientService);

  constructor(database: Database) {
    super(database, 'shoppingList', shoppingListItemSchema);
  }

  getShoppingList$(): Observable<ShoppingList> {
    return this.getAll$().pipe(
      map((allItems) =>
        categories
          .map((category) => {
            return {
              category,
              items: Object.entries(allItems)
                .filter((entry) => entry[1].category === category)
                .map(([key, { content, done }]) => ({ key, content, done }))
            };
          })
          .filter((category) => category.items.length > 0)
      )
    );
  }

  async resetFromPlan(): Promise<void> {
    const plan = await this.planService.getAll();
    const meals = await this.mealService.getAll();
    const ingredients = await this.ingredientService.getAll();
    const quantitiesByUnitAndIngredient: Map<Unit, Map<string, number>> = new Map();

    // Clear the shopping list.
    await set(ref(this.database, 'shoppingList'), {});

    // Aggregate the quantities for each pair of unit and ingredient.
    for (const plannedMeal of Object.values(plan)) {
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
        const content = `${name} ${formatUnit(quantity, unit)}`;
        await this.add({ category, content, done: false });
      }
    }
  }
}
