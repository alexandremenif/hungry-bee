import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit, units } from '../../../core/models/unit.model';
import { IngredientService } from '../../../core/services/ingredient.service';
import { MealIngredient } from '../../../core/models/meal.model';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent {
  readonly data?: MealIngredient = inject(MAT_DIALOG_DATA);
  readonly ingredientService = inject(IngredientService);

  readonly ingredients$ = this.ingredientService.getAll$();
  readonly units: Unit[] = units;

  model: Partial<MealIngredient> = {
    ingredientKey: this.data?.ingredientKey,
    quantity: this.data?.quantity ?? 1,
    unit: this.data?.unit ?? 'PIECE',
    scaleServings: this.data?.scaleServings ?? true
  };
}
