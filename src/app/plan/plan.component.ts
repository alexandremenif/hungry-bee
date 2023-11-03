import { Component } from '@angular/core';
import { PlanService } from './plan.service';
import { Observable, tap } from 'rxjs';
import { Plan } from './plan.model';
import { MatDialog } from '@angular/material/dialog';
import { MealSelectionDialogComponent } from './meal-selection-dialog/meal-selection-dialog.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {

  plan$: Observable<Plan> = this.planService.plan$;

  constructor(readonly planService: PlanService, readonly dialog: MatDialog) {
  }

  async setPlanName(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    await this.planService.setPlanName((event.target as HTMLInputElement).value);
  }

  async removeMeal(key: string) {
    await this.planService.removeMeal(key);
  }

  async addMeal() {
    await this.planService.addMeal('POT_AU_FEU');
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
