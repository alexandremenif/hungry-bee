import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { categories, Category } from '../core/models/category.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog/shopping-list-item-edition-dialog.component';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { ShoppingList } from './shopping-list.model';
import { map } from 'rxjs/operators';
import { ShoppingListItem } from '../core/models/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  readonly dialog = inject(MatDialog);
  readonly shoppingListService = inject(ShoppingListService);

  readonly categories: Category[] = categories;

  shoppingList$: Observable<ShoppingList> = this.shoppingListService.getAll$().pipe(
    map((allItems) => {
      return categories
        .map((category) => {
          const items = Object.entries(allItems)
            .filter((entry) => entry[1].category === category)
            .map(([key, { entry, done }]) => ({ key, entry, done }));
          return {
            category,
            items: items
          };
        })
        .filter((category) => category.items.length > 0);
    })
  );

  deleteItem(itemKey: string): Promise<void> {
    return this.shoppingListService.remove(itemKey);
  }

  openShoppingListItemEditionDialog(item?: { key: string; value: ShoppingListItem }) {
    const dialogRef: MatDialogRef<ShoppingListItemEditionDialogComponent, ShoppingListItem> = this.dialog.open(
      ShoppingListItemEditionDialogComponent,
      {
        data: item?.value
      }
    );
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data !== undefined) {
        if (item?.key) {
          return this.shoppingListService.update(item.key, data);
        } else {
          return this.shoppingListService.add(data);
        }
      }
    });
  }

  setDone(itemKey: string, done: boolean): Promise<void> {
    return this.shoppingListService.update(itemKey, { done });
  }
}
