import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { MealSelectionDialogComponent } from './meal-selection-dialog/meal-selection-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlanComponent, MealSelectionDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    PlanRoutingModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ]
})
export class PlanModule {}
