import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { PriceComponent } from './components/price/price.component';
import { MatIconModule } from '@angular/material/icon';
import { AverageMealRatingPipe } from './pipes/average-ratings.pipe';



@NgModule({
  declarations: [
    PriceComponent,
    RatingComponent,
    AverageMealRatingPipe
  ],
  exports: [
    RatingComponent,
    PriceComponent,
    AverageMealRatingPipe
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }
