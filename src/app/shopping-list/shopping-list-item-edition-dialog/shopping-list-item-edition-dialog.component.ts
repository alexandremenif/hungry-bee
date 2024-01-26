import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categories } from '../../core/models/category.model';
import { ShoppingListItemEdition } from '../../core/models/shopping-list.model';

@Component({
  selector: 'app-shopping-list-item-edition-dialog',
  templateUrl: './shopping-list-item-edition-dialog.component.html',
  styleUrls: ['./shopping-list-item-edition-dialog.component.scss']
})
export class ShoppingListItemEditionDialogComponent {
  readonly data?: ShoppingListItemEdition = inject(MAT_DIALOG_DATA);
  readonly categories = categories;

  model: Partial<ShoppingListItemEdition> = {
    content: this.data?.content,
    category: this.data?.category
  };
}
