import { z } from 'zod';
import { unitKeySchema } from './unit.schema';

export const mealIngredientSchema = z.object({
  ingredient: z.string(),
  quantity: z.number(),
  unit: unitKeySchema,
  scaleServings: z.boolean()
});

export const mealSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.record(mealIngredientSchema).optional(),
  servings: z.number()
});
