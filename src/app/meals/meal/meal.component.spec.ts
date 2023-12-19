import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealComponent } from './meal.component';

describe('MealDetailsComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealComponent]
    });
    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
