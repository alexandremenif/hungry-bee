import { z } from 'zod';

export const shoppingListItemSchema = z.object({
  text: z.string(),
  checked: z.boolean()
});

export const shoppingListSchema = z.record(z.record(shoppingListItemSchema));
