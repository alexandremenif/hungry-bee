import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { IngredientsComponent } from './ingredients.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [IngredientsComponent, IngredientDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    IngredientsRoutingModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class IngredientsModule {}
