import { Component } from '@angular/core';
import { PlanService } from '../plan.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MealSelectionDialogService } from './meal-selection-dialog.service';
import { Meal } from './meal-selection-dialog.model';

@Component({
  selector: 'app-meal-selection-dialog',
  templateUrl: './meal-selection-dialog.component.html',
  styleUrls: ['./meal-selection-dialog.component.scss']
})
export class MealSelectionDialogComponent {

  meals$ = this.mealSelectionDialogService.meals$;

  selection?: Meal;

  constructor(
    readonly dialogRef: MatDialogRef<MealSelectionDialogComponent>,
    readonly mealSelectionDialogService: MealSelectionDialogService
  ) {
  }

  add() {
    this.dialogRef.close(this.selection?.code);
  }
}
