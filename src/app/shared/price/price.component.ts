import { Component, Input } from '@angular/core';
import { Price } from '../shared.model';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {

  @Input()
  value: Price = 'AVERAGE';
}
