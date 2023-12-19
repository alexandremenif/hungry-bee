import { Component, inject } from '@angular/core';
import { categories } from '../core/models/category.model';
import { IngredientService } from '../core/services/ingredient.service';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../core/models/ingredient.model';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  readonly dialog = inject(MatDialog);
  readonly ingredientService = inject(IngredientService);
  readonly ingredients$ = this.ingredientService.getAll$();
  readonly categories = categories;

  openIngredientDialog(ingredient?: KeyValue<string, Ingredient>) {
    this.dialog
      .open<IngredientDialogComponent, Ingredient | undefined, Ingredient>(IngredientDialogComponent, {
        data: ingredient?.value
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (ingredient) {
            this.ingredientService.update(ingredient.key, result);
          } else {
            this.ingredientService.add(result);
          }
        }
      });
  }

  deleteIngredient(key: string) {
    this.ingredientService.delete(key).then();
  }
}
