import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingListJSON: string = 'No Shopping List';

  subscription?: Subscription;

  constructor(readonly shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.shoppingList$.subscribe(shoppingList => {
      this.shoppingListJSON = shoppingList ? JSON.stringify(shoppingList, null, 2) : 'No Shopping List';
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
