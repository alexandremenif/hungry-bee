import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog/shopping-list-item-edition-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListItemEditionDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {}
