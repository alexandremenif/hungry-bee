import { z } from 'zod';
import { categorySchema } from './category.schema';

export const shoppingListItemSchema = z.object({
  entry: z.string(),
  done: z.boolean(),
  category: categorySchema
});

export const shoppingListSchema = z.record(shoppingListItemSchema);
