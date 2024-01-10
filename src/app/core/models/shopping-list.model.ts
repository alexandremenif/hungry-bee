import { z } from 'zod';
import { shoppingListItemSchema, shoppingListSchema } from '../schemas/shopping-list.schema';

export type ShoppingList = z.infer<typeof shoppingListSchema>;

export type ShoppingListItem = z.infer<typeof shoppingListItemSchema>;
