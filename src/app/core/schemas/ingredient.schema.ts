import { z } from 'zod';
import { categorySchema } from './category.schema';

export const ingredientSchema = z.object({
  name: z.string(),
  category: categorySchema
});
