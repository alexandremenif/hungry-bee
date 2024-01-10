import { z } from 'zod';
import { priceSchema } from '../schemas/price.schema';

export type Price = z.infer<typeof priceSchema>;
