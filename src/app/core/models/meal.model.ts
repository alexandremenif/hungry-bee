import { Unit } from './unit.model';

export type Meal = {
  name: string;
  description: string;
  ingredients: Record<string, MealIngredient>;
  servings: number;
};

export type MealIngredient = {
  ingredientKey: string;
  quantity: number;
  unit: Unit;
  scaleServings: boolean;
};

export type MealList = ({ key: string } & Meal)[];

export type MealWithIngredients = {
  key: string;
  name: string;
  description: string;
  ingredients: {
    key: string;
    quantity: number;
    unit: Unit;
    scaleServings: boolean;
    ingredient: { key: string; name: string };
  }[];
  servings: number;
};
