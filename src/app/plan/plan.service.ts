import { Injectable } from '@angular/core';
import { Database, object, push, ref, remove, set } from '@angular/fire/database';
import { combineLatest, map, Observable } from 'rxjs';
import { createPlan, Plan, RawMeal, RawPlan } from './plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private rawPlan$: Observable<RawPlan> = object(ref(this.database, 'plan')).pipe(
    map(plan => {
      const name: string = plan.snapshot.val().name;
      const meals: { key: string, code: string }[] = [];
      plan.snapshot.child('meals').forEach(meal => {
        meals.push({ key: meal.key, code: meal.val() });
      });
      return { name, meals };
    })
  );

  private personKeys$: Observable<string[]> = object(ref(this.database, 'persons')).pipe(
    map(persons => Object.keys(persons.snapshot.val()))
  );

  private rawMeals$: Observable<{ [mealCode: string]: RawMeal }> = object(ref(this.database, 'meals')).pipe(
    map(meals => meals.snapshot.val() as { [mealCode: string]: RawMeal })
  );

  plan$: Observable<Plan> = combineLatest([
    this.rawPlan$,
    this.rawMeals$,
    this.personKeys$
  ]).pipe(
    map(([rawPlan, rawMeals, personKeys]) => createPlan(rawPlan, rawMeals, personKeys))
  );

  constructor(readonly database: Database) { }

  setPlanName(name: string): Promise<void> {
    return set(ref(this.database, 'plan/name'), name);
  }

  removeMeal(key: string): Promise<void> {
    return remove(ref(this.database, 'plan/meals/' + key));
  }

  addMeal(code: string): Promise<void> {
    return push(ref(this.database, 'plan/meals'), code).then();
  }
}
