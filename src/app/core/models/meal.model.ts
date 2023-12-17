import { Price } from './price.model';
import { Rating } from './rating.model';
import { UnitKey } from './unit.model';

export type Meal = {
  name: string;
  description: string;
  price: Price;
  ratings: { [key: string]: Rating };
  ingredients: { [key: string]: MealIngredient };
  servings: number;
  cooks: string[];
};

export type MealIngredient = {
  key: string;
  quantity: number;
  unit: UnitKey;
  scaleServings: boolean;
};
