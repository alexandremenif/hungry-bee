import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDialogComponent } from './ingredient-dialog.component';

describe('IngredientDialogComponent', () => {
  let component: IngredientDialogComponent;
  let fixture: ComponentFixture<IngredientDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientDialogComponent],
    });
    fixture = TestBed.createComponent(IngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
