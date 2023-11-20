import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, categories, CategoryKey } from '../../shared/category';

@Component({
  selector: 'app-shopping-list-item-edition-dialog',
  templateUrl: './shopping-list-item-edition-dialog.component.html',
  styleUrls: ['./shopping-list-item-edition-dialog.component.scss']
})
export class ShoppingListItemEditionDialogComponent {

  readonly categories: (Category & { key: string })[] = Object.entries(categories)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.order - b.order);

  text?: string;
  categoryKey?: CategoryKey;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string, categoryKey: CategoryKey }) {
    this.text = data.text;
    this.categoryKey = data.categoryKey;
  }
}
