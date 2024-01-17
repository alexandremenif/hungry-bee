import { Pipe, PipeTransform } from '@angular/core';
import { Category, getCategoryName } from '../models/category.model';

@Pipe({
  name: 'categoryName',
  standalone: true,
  pure: true
})
export class CategoryNamePipe implements PipeTransform {
  transform(category: Category): string {
    return getCategoryName(category);
  }
}
