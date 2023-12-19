import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListItemEditionDialogComponent } from './shopping-list-item-edition-dialog.component';

describe('ItemTextEditionDialogComponent', () => {
  let component: ShoppingListItemEditionDialogComponent;
  let fixture: ComponentFixture<ShoppingListItemEditionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListItemEditionDialogComponent]
    });
    fixture = TestBed.createComponent(ShoppingListItemEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
