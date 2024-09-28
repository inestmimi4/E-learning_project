import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceDiscount',
  standalone: true
})
export class PriceDiscountPipe implements PipeTransform {

  transform(price: number, discount: number): number {
    return +(price - price * discount / 100).toPrecision(4);
  }

}
