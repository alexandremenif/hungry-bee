import { Schema, z } from 'zod';
import { categorySchema } from './category.schema';
import { Ingredient } from '../../models/ingredient.model';

export const ingredientSchema: Schema<Ingredient> = z.object({
  name: z.string(),
  category: categorySchema
});
