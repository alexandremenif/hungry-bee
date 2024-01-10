import { z } from 'zod';
import { categoryKeySchema } from './category.schema';

export const ingredientSchema = z.object({
  name: z.string(),
  category: categoryKeySchema
});
