import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Database, object, push, ref, remove, update } from '@angular/fire/database';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  readonly rootPath = 'plan';
  readonly database = inject(Database);

  get$(): Observable<Plan> {
    return object(ref(this.database, this.rootPath)).pipe(map((queryChange) => queryChange.snapshot.val()));
  }

  get(): Promise<Plan> {
    return firstValueFrom(this.get$());
  }

  async update(plan: Partial<Plan>): Promise<void> {
    return update(ref(this.database, this.rootPath), plan);
  }

  async removePlannedMeal(mealKey: string): Promise<void> {
    return remove(ref(this.database, this.mealPath(mealKey)));
  }

  async addPlannedMeal(mealKey: string): Promise<void> {
    return push(ref(this.database, this.mealsPath()), mealKey).then();
  }

  mealsPath(): string {
    return `${this.rootPath}/meals`;
  }

  mealPath(key: string): string {
    return `${this.mealsPath()}/${key}`;
  }
}
