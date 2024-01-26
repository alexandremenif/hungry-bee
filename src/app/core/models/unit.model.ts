export type Unit = 'GRAM' | 'LITER' | 'PIECE';

export const units: Unit[] = ['GRAM', 'LITER', 'PIECE'];

export function getUnitName(unit: Unit): string {
  switch (unit) {
    case 'GRAM':
      return 'Gram';
    case 'LITER':
      return 'Liter';
    case 'PIECE':
      return 'Piece';
  }
}

export function formatUnit(quantity: number, unit: Unit): string {
  switch (unit) {
    case 'GRAM':
      return formatGram(quantity);
    case 'LITER':
      return formatLiter(quantity);
    case 'PIECE':
      return formatPiece(quantity);
  }
}

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
