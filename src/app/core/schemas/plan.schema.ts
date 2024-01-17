import { z } from 'zod';

export const plannedMealSchema = z.object({
  mealKey: z.string(),
  servings: z.number()
});

export const planSchema = z.object({
  meals: z.preprocess((value) => value ?? {}, z.record(plannedMealSchema))
});
