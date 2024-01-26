import { Category } from './category.model';

export type ShoppingListItem = {
  content: string;
  done: boolean;
  category: string;
};

export type ShoppingList = ShoppingListCategory[];

export type ShoppingListCategory = {
  category: Category;
  items: ShoppingListCategoryItem[];
};

export type ShoppingListCategoryItem = { key: string } & Omit<ShoppingListItem, 'category'>;

export type ShoppingListItemEdition = Omit<ShoppingListItem, 'done'>;
