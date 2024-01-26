import { Category } from './category.model';

export type Ingredient = {
  name: string;
  category: Category;
};

export type IngredientList = ({ key: string } & Ingredient)[];
