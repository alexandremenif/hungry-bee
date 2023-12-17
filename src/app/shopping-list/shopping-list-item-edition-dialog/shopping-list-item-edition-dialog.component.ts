import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, categories, CategoryKey } from '../../core/models/category.model';

@Component({
  selector: 'app-shopping-list-item-edition-dialog',
  templateUrl: './shopping-list-item-edition-dialog.component.html',
  styleUrls: ['./shopping-list-item-edition-dialog.component.scss'],
})
export class ShoppingListItemEditionDialogComponent {
  readonly data: { text: string; categoryKey: CategoryKey } = inject(MAT_DIALOG_DATA);
  readonly categories: (Category & { key: string })[] = Object.entries(categories)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.order - b.order);

  text: string = this.data.text;
  categoryKey: CategoryKey = this.data.categoryKey;
}
