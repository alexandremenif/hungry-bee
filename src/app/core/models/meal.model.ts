import { z } from 'zod';
import { mealIngredientSchema, mealSchema } from '../schemas/meal.schema';

export type Meal = z.infer<typeof mealSchema>;

export type MealIngredient = z.infer<typeof mealIngredientSchema>;

export const emptyMeal: Meal = {
  name: '',
  description: '',
  ingredients: {},
  servings: 3
};
