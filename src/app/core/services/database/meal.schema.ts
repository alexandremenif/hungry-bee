import { Schema, z } from 'zod';
import { unitSchema } from './unit.schema';
import { Meal, MealIngredient } from '../../models/meal.model';

export const mealIngredientSchema: Schema<MealIngredient> = z.object({
  ingredientKey: z.string(),
  quantity: z.number(),
  unit: unitSchema,
  scaleServings: z.boolean()
});

export const mealSchema: Schema<Meal> = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.preprocess((obj) => obj ?? {}, z.record(mealIngredientSchema)),
  servings: z.number()
}) as Schema<Meal>;
