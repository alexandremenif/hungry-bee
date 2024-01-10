import { z } from 'zod';
import { categoryKeySchema } from '../schemas/category.schema';

export type Category = { name: string; order: number };

export type CategoryKey = z.infer<typeof categoryKeySchema>;

export const categories: Record<CategoryKey, Category> = {
  MEAT: { name: 'Meat', order: 0 },
  FISH: { name: 'Fish', order: 1 },
  FRUIT: { name: 'Fruit', order: 2 },
  VEGETABLE: { name: 'Vegetable', order: 3 },
  DAIRY: { name: 'Dairy', order: 4 },
  GROCERY: { name: 'Grocery', order: 5 },
  OTHER: { name: 'Other', order: 6 }
};
