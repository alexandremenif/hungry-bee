import { Pipe, PipeTransform } from '@angular/core';
import { MealIngredient } from '../../core/models/meal.model';
import { formatUnit } from '../../core/models/unit.model';

@Pipe({
  name: 'ingredientQuantity',
  pure: true
})
export class IngredientQuantityPipe implements PipeTransform {
  transform(ingredient: MealIngredient): string {
    const formattedQuantity = formatUnit(ingredient.quantity, ingredient.unit);
    return ingredient.scaleServings ? formattedQuantity : `${formattedQuantity} (fixed)`;
  }
}
