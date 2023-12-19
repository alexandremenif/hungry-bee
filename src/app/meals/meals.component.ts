import { Component, inject, OnInit } from '@angular/core';
import { MealService } from '../core/services/meal.service';
import { map } from 'rxjs/operators';
import { filter } from '../shared/utilities/filter';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Meal } from '../core/models/meal.model';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  readonly mealsService = inject(MealService);
  readonly router = inject(Router);

  filteredMeals$: Observable<Record<string, Meal>> = this.mealsService.getAll$();
  filterText = '';

  ngOnInit(): void {
    this.filteredMeals$ = this.mealsService.getAll$();
  }

  applyFilter(): void {
    this.filteredMeals$ = this.mealsService
      .getAll$()
      .pipe(
        map((meals) =>
          filter(
            meals,
            (meal) =>
              meal.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
              meal.description.toLowerCase().includes(this.filterText.toLowerCase())
          )
        )
      );
  }

  addMeal(): void {
    this.mealsService.add({
      name: '',
      description: '',
      price: 'AVERAGE',
      ratings: {},
      ingredients: {},
      servings: 3,
      cooks: []
    });
  }

  deleteMeal(key: string): void {
    this.mealsService.delete(key);
  }

  navigateToMeal(key: string): void {
    this.router.navigateByUrl(`meals/${key}`);
  }
}
