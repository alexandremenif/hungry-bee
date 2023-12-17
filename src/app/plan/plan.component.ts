import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MealSelectionDialogComponent } from './meal-selection-dialog/meal-selection-dialog.component';
import { Router } from '@angular/router';
import { PlanService } from '../core/services/plan.service';
import { MealService } from '../core/services/meal.service';
import { PersonService } from '../core/services/person.service';
import { ShoppingListService } from '../core/services/shopping-list.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly planService = inject(PlanService);
  readonly mealService = inject(MealService);
  readonly personService = inject(PersonService);
  readonly shoppingListService = inject(ShoppingListService);

  plan$ = this.planService.get$();
  meals$ = this.mealService.getAll$();
  persons$ = this.personService.getAll$().pipe(map((persons) => Object.values(persons)));

  async setPlanName(name: string) {
    await this.planService.update({ name });
  }

  async removePlannedMeal(key: string) {
    await this.planService.removePlannedMeal(key);
  }

  async createShoppingList() {
    await this.shoppingListService.createFromPlan();
    await this.router.navigateByUrl('/shopping-list');
  }

  openMealSelectionDialog() {
    const dialogRef = this.dialog.open(MealSelectionDialogComponent, {
      width: '30rem',
    });
    dialogRef.afterClosed().subscribe((mealKey) => {
      if (mealKey) {
        this.planService.addPlannedMeal(mealKey).then();
      }
    });
  }
}
