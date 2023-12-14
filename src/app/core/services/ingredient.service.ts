import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends Repository<Ingredient> {

  constructor() {
    super('ingredients');
  }
}
