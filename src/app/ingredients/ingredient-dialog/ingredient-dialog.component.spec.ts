import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDialogComponent } from './ingredient-dialog.component';

describe('IngredientDetailsComponent', () => {
  let component: IngredientDialogComponent;
  let fixture: ComponentFixture<IngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
