import { Schema, z } from 'zod';
import { categorySchema } from './category.schema';
import { ShoppingListItem } from '../../models/shopping-list.model';

export const shoppingListItemSchema: Schema<ShoppingListItem> = z.object({
  content: z.string(),
  done: z.boolean(),
  category: categorySchema
});
