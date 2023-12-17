export type ShoppingList = {
  [category: string]: { [key: string]: ShoppingListItem };
};

export type ShoppingListItem = { text: string; checked: boolean };
