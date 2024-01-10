import { z } from 'zod';

export const unitKeySchema = z.union([z.literal('GRAM'), z.literal('LITER'), z.literal('PIECE')]);
