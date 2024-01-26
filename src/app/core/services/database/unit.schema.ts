import { Schema, z } from 'zod';
import { Unit } from '../../models/unit.model';

export const unitSchema: Schema<Unit> = z.union([z.literal('GRAM'), z.literal('LITER'), z.literal('PIECE')]);
