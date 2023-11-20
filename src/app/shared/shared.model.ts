import { Index } from './price';
import { Rating } from './rating';
import { Unit } from './unit';
import { CategoryKey } from './category';

export type Model = {
  persons: { [key: string]: { name: string } },
  meals: { [key: string]: {
    name: string,
    description: string,
    price: Index,
    ratings: { [key: string]: Rating },
    ingredients: { [key: string]: { quantity: number, unit: Unit, scalable: boolean } },
    yield: number,
    cooks: string[]
  }},
  ingredients: { [key: string]: { name: string, category: CategoryKey } },
  plan: {
    name: string,
    meals: string[]
  },
  shoppingList: { [category: string]: { [key: string]: ShoppingListItem } }
};

export type ShoppingListItem = { text: string, checked: boolean };
