import { z } from 'zod';
import { unitSchema } from './unit.schema';

export const mealIngredientSchema = z.object({
  ingredientKey: z.string(),
  quantity: z.number(),
  unit: unitSchema,
  scaleServings: z.boolean()
});

export const mealSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.preprocess((obj) => obj ?? {}, z.record(mealIngredientSchema)),
  servings: z.number()
});
