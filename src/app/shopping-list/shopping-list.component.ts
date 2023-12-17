import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { categories, Category } from '../core/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog/shopping-list-item-edition-dialog.component';
import { ShoppingList, ShoppingListItem } from '../core/models/shopping-list.model';
import { ShoppingListService } from '../core/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  readonly dialog = inject(MatDialog);
  readonly shoppingListService = inject(ShoppingListService);

  readonly categories: (Category & { key: string })[] = Object.entries(categories)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.order - b.order);

  shoppingList$: Observable<ShoppingList> = this.shoppingListService.get$();

  deleteItem(categoryKey: string, itemKey: string): Promise<void> {
    return this.shoppingListService.removeItem(categoryKey, itemKey);
  }

  editItem(categoryKey: string, itemKey: string, item: ShoppingListItem) {
    const dialogRef = this.dialog.open(ShoppingListItemEditionDialogComponent, {
      data: { text: item.text, categoryKey },
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data !== undefined) {
        if (data.categoryKey !== categoryKey) {
          await this.shoppingListService.removeItem(categoryKey, itemKey);
          return this.shoppingListService.addItem(data.categoryKey, {
            text: data.text,
            checked: item.checked,
          });
        } else {
          return this.shoppingListService.updateItem(categoryKey, itemKey, {
            text: data.text,
          });
        }
      }
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(ShoppingListItemEditionDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data !== undefined) {
        this.shoppingListService.addItem(data.categoryKey, {
          text: data.text,
          checked: false,
        });
      }
    });
  }

  setChecked(categoryKey: string, itemKey: string, checked: boolean): Promise<void> {
    return this.shoppingListService.updateItem(categoryKey, itemKey, {
      checked,
    });
  }
}
