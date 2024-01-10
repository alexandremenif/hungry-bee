import { z } from 'zod';
import { ingredientSchema } from '../schemas/ingredient.schema';

export type Ingredient = z.infer<typeof ingredientSchema>;
