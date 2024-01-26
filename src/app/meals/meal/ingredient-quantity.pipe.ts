import { Pipe, PipeTransform } from '@angular/core';
import { formatUnit, Unit } from '../../core/models/unit.model';

@Pipe({
  name: 'ingredientQuantity',
  pure: true
})
export class IngredientQuantityPipe implements PipeTransform {
  transform(ingredient: { quantity: number; unit: Unit; scaleServings: boolean }): string {
    const formattedQuantity = formatUnit(ingredient.quantity, ingredient.unit);
    return ingredient.scaleServings ? formattedQuantity : `${formattedQuantity} (fixed)`;
  }
}
