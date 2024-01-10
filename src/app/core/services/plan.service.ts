import { Injectable } from '@angular/core';
import { Plan, PlannedMeal } from '../models/plan.model';
import { Node } from '../utilities/node';
import { plannedMealSchema, planSchema } from '../schemas/plan.schema';
import { Collection } from '../utilities/collection';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends Node<Plan> {
  constructor(database: Database) {
    super(database, 'plan', planSchema, () => ({ meals: {} }));
  }

  async removeMeal(key: string): Promise<void> {
    return this.meals.remove(key);
  }

  async addMeal(meal: PlannedMeal): Promise<string | null> {
    return this.meals.add(meal);
  }

  private get meals(): Collection<PlannedMeal> {
    return new Collection(this.database, `${this.path}/meals`, plannedMealSchema);
  }
}
