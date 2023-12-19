import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MealService } from '../../core/services/meal.service';
import { Meal } from '../../core/models/meal.model';

@Component({
  selector: 'app-meal-selection-dialog',
  templateUrl: './meal-selection-dialog.component.html',
  styleUrls: ['./meal-selection-dialog.component.scss']
})
export class MealSelectionDialogComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly mealService = inject(MealService);

  meals$ = this.mealService.getAll$();
  selection?: { key: string; value: Meal };

  add() {
    this.dialogRef.close(this.selection?.key);
  }
}
