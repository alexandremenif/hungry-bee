import { Injectable } from '@angular/core';
import { Database, get, object, ref, remove, set } from '@angular/fire/database';
import { combineLatest, map, Observable } from 'rxjs';
import { Plan } from './plan.model';
import { averageRatings } from '../shared/rating';
import { Model } from '../shared/shared.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plan$: Observable<Plan> = this.getPlan$();

  constructor(readonly database: Database) { }

  setPlanName(name: string): Promise<void> {
    return set(ref(this.database, 'plan/name'), name);
  }

  removeMeal(index: number): Promise<void> {
    return remove(ref(this.database, 'plan/meals/' + index));
  }

  async addMeal(mealId: string): Promise<void> {
    const planMealCount = (await get(ref(this.database, 'plan/meals'))).size;
    return set(ref(this.database, 'plan/meals/' + planMealCount), mealId);
  }

  private getPlan$(): Observable<Plan> {
    return combineLatest([
      object(ref(this.database, 'plan')).pipe(
        map(plan => plan.snapshot.val() as Model['plan'])
      ),
      object(ref(this.database, 'meals')).pipe(
        map(meals => meals.snapshot.val() as Model['meals'])
      ),
      object(ref(this.database, 'persons')).pipe(
        map(persons => persons.snapshot.val() as Model['persons'])
      )
    ]).pipe(
      map(([plan, meals, persons]) => {
        return {
          name: plan.name,
          meals: plan.meals.map(mealKey => {
            const meal = meals[mealKey];
            const ratings = Object.keys(persons).map(personKey => meal.ratings[personKey] ?? 3);
            return {
              name: meal.name,
              description: meal.description,
              price: meal.price,
              rating: averageRatings(ratings)
            }
          })
        };
      })
    );
  }
}
