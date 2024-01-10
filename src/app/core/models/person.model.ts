import { z } from 'zod';
import { personSchema } from '../schemas/person.schema';

export type Person = z.infer<typeof personSchema>;
