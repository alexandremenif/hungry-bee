import { z } from 'zod';

export const unitSchema = z.union([z.literal('GRAM'), z.literal('LITER'), z.literal('PIECE')]);
