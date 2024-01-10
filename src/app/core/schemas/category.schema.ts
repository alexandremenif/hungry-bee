import { z } from 'zod';

export const categoryKeySchema = z.union([
  z.literal('MEAT'),
  z.literal('FISH'),
  z.literal('FRUIT'),
  z.literal('VEGETABLE'),
  z.literal('DAIRY'),
  z.literal('GROCERY'),
  z.literal('OTHER')
]);
