import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categories } from '../../core/models/category.model';
import { ShoppingListItem } from '../../core/models/shopping-list.model';

@Component({
  selector: 'app-shopping-list-item-edition-dialog',
  templateUrl: './shopping-list-item-edition-dialog.component.html',
  styleUrls: ['./shopping-list-item-edition-dialog.component.scss']
})
export class ShoppingListItemEditionDialogComponent {
  readonly data?: ShoppingListItem = inject(MAT_DIALOG_DATA);
  readonly categories = categories;

  model: Partial<ShoppingListItem> = {
    entry: this.data?.entry ?? '',
    category: this.data?.category,
    done: false
  };
}
