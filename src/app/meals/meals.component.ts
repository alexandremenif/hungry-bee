import { Component, inject } from '@angular/core';
import { MealService } from '../core/services/meal.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent {
  readonly mealsService = inject(MealService);
  readonly router = inject(Router);

  meals = this.mealsService.getMealList$();

  applyFilter(filter: string): void {
    this.meals = this.mealsService
      .getMealList$()
      .pipe(
        map((meals) =>
          meals.filter(
            (meal) =>
              meal.name.toLowerCase().includes(filter.toLowerCase()) ||
              meal.description.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
  }

  addMeal(): void {
    this.mealsService.add({
      name: '',
      description: '',
      ingredients: {},
      servings: 3
    });
  }

  deleteMeal(key: string): void {
    this.mealsService.remove(key);
  }

  navigateToMeal(key: string): void {
    this.router.navigateByUrl(`meals/${key}`);
  }
}
