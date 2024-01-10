import { z } from 'zod';

export const plannedMealSchema = z.object({
  meal: z.string(),
  servings: z.number()
});

export const planSchema = z.object({
  meals: z.record(plannedMealSchema).optional()
});
