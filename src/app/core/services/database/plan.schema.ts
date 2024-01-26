import { Schema, z } from 'zod';
import { PlannedMeal } from '../../models/plan.model';

export const plannedMealSchema: Schema<PlannedMeal> = z.object({
  mealKey: z.string(),
  servings: z.number()
});
