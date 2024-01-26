import { Component, inject } from '@angular/core';
import { IngredientService } from '../core/services/ingredient.service';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../core/models/ingredient.model';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  readonly dialog = inject(MatDialog);
  readonly ingredientService = inject(IngredientService);

  ingredients$ = this.ingredientService.getIngredientList$();

  applyFilter(filter: string): void {
    this.ingredients$ = this.ingredientService
      .getIngredientList$()
      .pipe(map((meals) => meals.filter((meal) => meal.name.toLowerCase().includes(filter.toLowerCase()))));
  }

  openIngredientDialog(ingredient?: { key: string } & Ingredient) {
    this.dialog
      .open<IngredientDialogComponent, Ingredient | undefined, Ingredient>(IngredientDialogComponent, {
        data: ingredient
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
    this.ingredientService.remove(key).then();
  }
}
