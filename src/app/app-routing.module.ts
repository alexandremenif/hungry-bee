import { NgModule } from '@angular/core';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'plan'
      },
      {
        path: 'plan',
        title: 'Plan',
        loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
      },
      {
        path: 'shopping-list',
        title: 'Shopping List',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
      }
    ],
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['sign-in']) }
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [AuthGuard],
    title: 'Sign in',
    data: { authGuardPipe: () => redirectLoggedInTo(['/']) }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
