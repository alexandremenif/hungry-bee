import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit, units } from '../../../core/models/unit.model';
import { IngredientService } from '../../../core/services/ingredient.service';
import { MealIngredient } from '../../../core/models/meal.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent {
  readonly data?: MealIngredient = inject(MAT_DIALOG_DATA);
  readonly ingredientService = inject(IngredientService);

  ingredients$ = this.ingredientService.getIngredientList$();
  readonly units: Unit[] = units;

  model: Partial<MealIngredient> = {
    ingredientKey: this.data?.ingredientKey,
    quantity: this.data?.quantity ?? 1,
    unit: this.data?.unit ?? 'PIECE',
    scaleServings: this.data?.scaleServings ?? true
  };

  applyFilter(filter: string) {
    this.ingredients$ = this.ingredientService
      .getIngredientList$()
      .pipe(
        map((ingredients) =>
          ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(filter.toLowerCase()))
        )
      );
  }

  displayFn$: Observable<(ingredientKey: string) => string> = this.ingredientService
    .getAll$()
    .pipe(map((record) => (ingredientKey: string) => record[ingredientKey]?.name ?? ''));
}
