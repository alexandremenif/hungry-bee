import { Component, Input } from '@angular/core';


import { Rating } from '../../../core/models/rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input()
  value: Rating = 3;
}
