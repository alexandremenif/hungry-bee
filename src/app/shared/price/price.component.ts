import { Component, Input } from '@angular/core';

import { Index } from './index';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {

  @Input()
  value: Index = 'AVERAGE';
}
