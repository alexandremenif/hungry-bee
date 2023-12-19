export type Category = { name: string; order: number };

export const categories = {
  MEAT: { name: 'Meat', order: 0 },
  FISH: { name: 'Fish', order: 1 },
  FRUIT: { name: 'Fruit', order: 2 },
  VEGETABLE: { name: 'Vegetable', order: 3 },
  DAIRY: { name: 'Dairy', order: 4 },
  GROCERY: { name: 'Grocery', order: 5 },
  OTHER: { name: 'Other', order: 6 }
};

export type CategoryKey = keyof typeof categories;
