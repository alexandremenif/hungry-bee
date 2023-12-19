import { Component, inject } from '@angular/core';
import { Ingredient } from '../../core/models/ingredient.model';
import { categories } from 'src/app/core/models/category.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrl: './ingredient-dialog.component.scss'
})
export class IngredientDialogComponent {
  readonly data?: Ingredient = inject(MAT_DIALOG_DATA);

  readonly categories = categories;

  model: Ingredient = {
    name: this.data?.name ?? '',
    category: this.data?.category ?? 'OTHER'
  };
}
