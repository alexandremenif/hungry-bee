import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { ShoppingList } from './shopping-list.model';
import { categories, Category } from '../shared/category';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog/shopping-list-item-edition-dialog.component';
import { ShoppingListItem } from '../shared/shared.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {

  readonly categories: (Category & { key: string })[] = Object.entries(categories)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.order - b.order);

  shoppingList$: Observable<ShoppingList> = this.shoppingListService.shoppingList$;

  constructor(readonly dialog: MatDialog, readonly shoppingListService: ShoppingListService) { }

  deleteItem(categoryKey: string, itemKey: string): Promise<void> {
    return this.shoppingListService.deleteItem(categoryKey, itemKey);
  }

  editItem(categoryKey: string, itemKey: string, item: ShoppingListItem) {
    const dialogRef = this.dialog.open(
      ShoppingListItemEditionDialogComponent,
      {
        data: { text: item.text, categoryKey }
      }
    );
    dialogRef.afterClosed().subscribe(async data => {
      if (data !== undefined) {

        if (data.categoryKey !== categoryKey) {
          await this.shoppingListService.deleteItem(categoryKey, itemKey);
          return this.shoppingListService.addItem(data.categoryKey, { text: data.text, checked: item.checked });
        } else {
          return this.shoppingListService.setText(categoryKey, itemKey, data.text);
        }
      }
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(
      ShoppingListItemEditionDialogComponent,
      {
        data: {}
      }
    );
    dialogRef.afterClosed().subscribe(async data => {
      if (data !== undefined) {

        this.shoppingListService.addItem(data.categoryKey, { text: data.text, checked: false });
      }
    });
  }

  setChecked(categoryKey: string, itemKey: string, checked: boolean): Promise<void> {
    return this.shoppingListService.setChecked(categoryKey, itemKey, checked);
  }
}
