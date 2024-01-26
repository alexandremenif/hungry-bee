import { Schema, z } from 'zod';
import { Category } from '../../models/category.model';

export const categorySchema: Schema<Category> = z.union([
  z.literal('MEAT'),
  z.literal('FISH'),
  z.literal('FRUIT'),
  z.literal('VEGETABLE'),
  z.literal('DAIRY'),
  z.literal('GROCERY'),
  z.literal('OTHER')
]);
