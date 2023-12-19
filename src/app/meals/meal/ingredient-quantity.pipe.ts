import { Pipe, PipeTransform } from '@angular/core';
import { MealIngredient } from '../../core/models/meal.model';
import { units } from '../../core/models/unit.model';

@Pipe({
  name: 'ingredientQuantity',
  pure: true
})
export class IngredientQuantityPipe implements PipeTransform {
  transform(ingredient: MealIngredient): string {
    const formattedQuantity = units[ingredient.unit].formatter(ingredient.quantity);
    return ingredient.scaleServings ? formattedQuantity : `${formattedQuantity} (fixed)`;
  }
}
