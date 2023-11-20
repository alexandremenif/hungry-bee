import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { PriceComponent } from './price/price.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    PriceComponent,
    RatingComponent
  ],
  exports: [
    RatingComponent,
    PriceComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }
