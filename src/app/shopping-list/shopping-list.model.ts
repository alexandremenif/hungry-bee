import { Category } from '../core/models/category.model';

export type ShoppingList = ShoppingListCategory[];

export type ShoppingListCategory = {
  category: Category;
  items: ShoppingListItem[];
};

export type ShoppingListItem = { key: string; entry: string; done: boolean };
