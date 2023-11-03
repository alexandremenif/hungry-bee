import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Database, object, ref } from '@angular/fire/database';
import { Meal } from './meal-selection-dialog.model';

@Injectable({
  providedIn: 'root'
})
export class MealSelectionDialogService {

  readonly meals$: Observable<Meal[]> = object(ref(this.database, 'meals')).pipe(
    map(meals => {
      const value = meals.snapshot.val() as { [code: string]: { name: string } };
      return Object.keys(value).map(code => ({ code, name: value[code].name }));
    })
  );

  constructor(readonly database: Database) { }
}
