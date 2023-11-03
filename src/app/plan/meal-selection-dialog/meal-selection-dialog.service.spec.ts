import { TestBed } from '@angular/core/testing';

import { MealSelectionDialogService } from './meal-selection-dialog.service';

describe('MealSelectionDialogService', () => {
  let service: MealSelectionDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealSelectionDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
