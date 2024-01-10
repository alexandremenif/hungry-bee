import { z } from 'zod';
import { plannedMealSchema, planSchema } from '../schemas/plan.schema';

export type Plan = z.infer<typeof planSchema>;

export type PlannedMeal = z.infer<typeof plannedMealSchema>;
