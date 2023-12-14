import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
import { map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IngredientService } from '../../core/services/ingredient.service';
import { MatDialog } from '@angular/material/dialog';
import { MealIngredient } from '../../core/models/meal.model';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  readonly route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  readonly mealService = inject(MealService);
  readonly ingredientService = inject(IngredientService);

  readonly servingsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  readonly meal$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('key')),
    switchMap(key => {

      if (key === null) {
        return throwError(() => new Error('No key provided'));
      } else {
        return this.mealService.get$(key).pipe(map(value => ({ key, value })))
      }
    })
  );

  readonly ingredients$ = this.ingredientService.getAll$();

  setName(key: string, name: string) {
    this.mealService.update(key, { name });
  }

  setDescription(key: string, description: string) {
    this.mealService.update(key, { description });
  }

  setServings(key: string, servings: number) {
    this.mealService.update(key, { servings });
  }

  openIngredientDialog(mealKey: string, ingredient?: KeyValue<string, MealIngredient>) {
    this.dialog
      .open<
        IngredientDialogComponent,
        MealIngredient | undefined,
        MealIngredient
      >(
        IngredientDialogComponent,
        { data: ingredient?.value }
      )
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (ingredient) {
            this.mealService.updateIngredient(mealKey, ingredient.key, result);
          } else {
            this.mealService.addIngredient(mealKey, result);
          }
        }
      })
  }

  removeIngredient(mealKey: string, ingredientKey: string) {
    this.mealService.removeIngredient(mealKey, ingredientKey);
  }
}
