import { Index } from './price';
import { Rating } from './rating';
import { Unit } from './unit';

export type Category = 'MEAT' | 'FISH' | 'VEGETABLE' | 'FRUIT' | 'DAIRY' | 'GROCERY' | 'OTHER';

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
  ingredients: { [key: string]: { name: string, category: Category } },
  plan: {
    name: string,
    meals: string[]
  },
  shoppingList: { [category: string]: { text: string; checked: boolean; }[] }
};

export type ShoppingList = Model['shoppingList'];
