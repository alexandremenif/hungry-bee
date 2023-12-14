import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from '../../core/models/meal.model';
import { averageRatings, Rating } from '../../core/models/rating.model';
import { Person } from '../../core/models/person.model';

@Pipe({
  name: 'averageMealRating'
})
export class AverageMealRatingPipe implements PipeTransform {

  readonly defaultRating: Rating = 3;

  transform(meal: Meal, persons: Person[]): Rating {
    const ratings = Object
      .keys(persons)
      .map((personKey => meal.ratings[personKey] ?? this.defaultRating));
    return averageRatings(ratings);
  }
}
