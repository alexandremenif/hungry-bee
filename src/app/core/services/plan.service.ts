import { inject, Injectable } from '@angular/core';
import { Plan, PlannedMeal } from '../models/plan.model';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import { DatabaseCollection } from './database/database-collection';
import { MealService } from './meal.service';
import { Database } from '@angular/fire/database';
import { plannedMealSchema } from './database/plan.schema';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends DatabaseCollection<PlannedMeal> {
  private readonly mealService = inject(MealService);

  constructor(database: Database) {
    super(database, 'plan', plannedMealSchema);
  }

  getPlan$(): Observable<Plan> {
    return this.getAll$().pipe(
      switchMap((plannedMeals) =>
        combineLatest(
          Object.values(plannedMeals).map((plannedMeal) =>
            this.mealService
              .get$(plannedMeal.mealKey)
              .pipe(map((meal) => [plannedMeal.mealKey, meal] as [string, Meal | undefined]))
          )
        ).pipe(
          map((meals) => {
            const mealRecord = Object.fromEntries(meals);
            return Object.entries(plannedMeals).map(([key, plannedMeal]) => ({
              key,
              meal: mealRecord[plannedMeal.mealKey]!,
              servings: plannedMeal.servings
            }));
          })
        )
      )
    );
  }
}
