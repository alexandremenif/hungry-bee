import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog/shopping-list-item-edition-dialog.component';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { ShoppingList, ShoppingListCategoryItem, ShoppingListItemEdition } from '../core/models/shopping-list.model';
import { Category } from '../core/models/category.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  readonly dialog = inject(MatDialog);
  readonly shoppingListService = inject(ShoppingListService);

  shoppingList$: Observable<ShoppingList> = this.shoppingListService.getShoppingList$();

  deleteItem(itemKey: string): Promise<void> {
    return this.shoppingListService.remove(itemKey);
  }

  openShoppingListItemEditionDialog(item?: ShoppingListCategoryItem & { category: Category }) {
    const dialogRef: MatDialogRef<ShoppingListItemEditionDialogComponent, ShoppingListItemEdition> = this.dialog.open(
      ShoppingListItemEditionDialogComponent,
      {
        data: item ? { content: item.content, category: item.category } : undefined
      }
    );
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data !== undefined) {
        if (item?.key) {
          return this.shoppingListService.update(item.key, data);
        } else {
          return this.shoppingListService.add({ ...data, done: false });
        }
      }
    });
  }

  setDone(itemKey: string, done: boolean): Promise<void> {
    return this.shoppingListService.update(itemKey, { done });
  }
}
