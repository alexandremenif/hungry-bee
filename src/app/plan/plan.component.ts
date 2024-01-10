import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MealSelectionDialogComponent } from './meal-selection-dialog/meal-selection-dialog.component';
import { Router } from '@angular/router';
import { PlanService } from '../core/services/plan.service';
import { MealService } from '../core/services/meal.service';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { PlannedMeal } from '../core/models/plan.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly planService = inject(PlanService);
  readonly mealService = inject(MealService);
  readonly shoppingListService = inject(ShoppingListService);

  plan$ = this.planService.get$();
  meals$ = this.mealService.getAll$();

  async removePlannedMeal(key: string) {
    await this.planService.removeMeal(key);
  }

  async createShoppingList() {
    await this.shoppingListService.createFromPlan();
    await this.router.navigateByUrl('/shopping-list');
  }

  openMealSelectionDialog() {
    const dialogRef: MatDialogRef<MealSelectionDialogComponent, PlannedMeal> = this.dialog.open(
      MealSelectionDialogComponent,
      {
        width: '30rem'
      }
    );
    dialogRef.afterClosed().subscribe((plannedMeal) => {
      if (plannedMeal) {
        this.planService.addMeal(plannedMeal).then();
      }
    });
  }
}
