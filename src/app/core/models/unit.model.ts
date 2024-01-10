import { z } from 'zod';
import { unitKeySchema } from '../schemas/unit.schema';

export type Unit = { name: string; formatter: (quantity: number) => string };

export type UnitKey = z.infer<typeof unitKeySchema>;

export const units: Record<UnitKey, Unit> = {
  GRAM: { name: 'Gram', formatter: formatGram },
  LITER: { name: 'Liter', formatter: formatLiter },
  PIECE: { name: 'Piece', formatter: formatPiece }
};

function formatLiter(quantity: number): string {
  if (quantity >= 1) {
    return `${quantity.toFixed(3)}l`;
  } else if (quantity >= 0.1) {
    return `${(quantity * 100).toFixed(1)}cl`;
  } else {
    return `${(quantity * 1000).toFixed(0)}ml`;
  }
}

function formatGram(quantity: number): string {
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(3)}kg`;
  } else {
    return `${quantity.toFixed(0)}g`;
  }
}

function formatPiece(quantity: number): string {
  const value = Math.ceil(quantity);
  return value === 1 ? '1pc' : `${value}pcs`;
}
