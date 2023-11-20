import { Component } from '@angular/core';
import { PlanService } from './plan.service';
import { Observable } from 'rxjs';
import { Plan } from './plan.model';
import { MatDialog } from '@angular/material/dialog';
import { MealSelectionDialogComponent } from './meal-selection-dialog/meal-selection-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {

  plan$: Observable<Plan> = this.planService.plan$;

  constructor(
    readonly dialog: MatDialog,
    readonly router: Router,
    readonly planService: PlanService
  ) {
  }

  async setPlanName(event: Event) {
    await this.planService.setPlanName((event.target as HTMLInputElement).value);
  }

  async removeMeal(index: number) {
    await this.planService.removeMeal(index);
  }

  async createShoppingList() {
    await this.planService.createShoppingList();
    await this.router.navigateByUrl('/shopping-list');
  }

  openMealSelectionDialog() {
    const dialogRef = this.dialog.open(
      MealSelectionDialogComponent,
      { width: '30rem'}
    );
    dialogRef.afterClosed().subscribe(mealCode => {
      if (mealCode) {
        this.planService.addMeal(mealCode);
      }
    });
  }
}
