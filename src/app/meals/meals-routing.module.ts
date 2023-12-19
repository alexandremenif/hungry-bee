import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { MealComponent } from './meal/meal.component';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent
  },
  {
    path: ':key',
    component: MealComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule {}
