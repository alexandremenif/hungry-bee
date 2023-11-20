import { Injectable } from '@angular/core';
import { Database, object, push, ref, remove, set } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { ShoppingList } from './shopping-list.model';
import { CategoryKey } from '../shared/category';
import { ShoppingListItem } from '../shared/shared.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingList$: Observable<ShoppingList> = object(ref(this.database, 'shoppingList')).pipe(
    map(queryChange => queryChange.snapshot.val())
  );

  constructor(readonly database: Database) { }

  deleteItem(categoryKey: string, itemKey: string): Promise<void> {
    return remove(ref(this.database, 'shoppingList/' + categoryKey + '/' + itemKey));
  }

  setChecked(categoryKey: string, itemKey: string, checked: boolean): Promise<void> {
    return set(ref(this.database, 'shoppingList/' + categoryKey + '/' + itemKey + '/checked'), checked);
  }

  setText(categoryKey: string, itemKey: string, text: string): Promise<void> {
    return set(ref(this.database, 'shoppingList/' + categoryKey + '/' + itemKey + '/text'), text);
  }

  addItem(categoryKey: CategoryKey, item: ShoppingListItem): Promise<void> {
    return push(ref(this.database, 'shoppingList/' + categoryKey), item).then();
  }
}
