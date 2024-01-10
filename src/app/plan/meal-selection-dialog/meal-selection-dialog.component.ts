import { Component, inject } from '@angular/core';
import { MealService } from '../../core/services/meal.service';
import { PlannedMeal } from '../../core/models/plan.model';

@Component({
  selector: 'app-meal-selection-dialog',
  templateUrl: './meal-selection-dialog.component.html',
  styleUrls: ['./meal-selection-dialog.component.scss']
})
export class MealSelectionDialogComponent {
  readonly mealService = inject(MealService);

  readonly servingsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  meals$ = this.mealService.getAll$();
  model: Partial<PlannedMeal> = {
    servings: 3
  };
}
