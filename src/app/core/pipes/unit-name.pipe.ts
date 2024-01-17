import { Pipe, PipeTransform } from '@angular/core';
import { getUnitName, Unit } from '../models/unit.model';

@Pipe({
  name: 'unitName',
  standalone: true
})
export class UnitNamePipe implements PipeTransform {
  transform(unit: Unit): string {
    return getUnitName(unit);
  }
}
