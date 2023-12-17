import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './meals.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MealComponent } from './meal/meal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { IngredientQuantityPipe } from './meal/ingredient-quantity.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { IngredientDialogComponent } from './meal/ingredient-dialog/ingredient-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [MealsComponent, MealComponent, IngredientQuantityPipe, IngredientDialogComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
})
export class MealsModule {}
