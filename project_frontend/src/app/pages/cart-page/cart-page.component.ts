import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription } from 'rxjs';
import { Product } from '../../interface/product';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../interface/cart-item';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart: CartItem[] = []
  cartSub!: Subscription;
  constructor(private cartService: CartService){}
  ngOnInit() {
    this.cartSub = this.cartService.getCart().subscribe((data: any) => {
      this.cart = data;
      console.log('cart', this.cart);
    });
  }
  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
  get subtotal(): number {
    let sum = 0;
    for (let el of this.cart) {
      sum += el.product.price * el.count;
    }
    return Number(sum.toPrecision(4));
  }
  get discount(): number {
    let sum = 0;
    for (let el of this.cart) {
      sum += el.product.price * el.product.discountPercentage * el.count / 100;
    }
    return Number(sum.toPrecision(4));
  }
  get total(): number {
    return Number((this.subtotal - this.discount).toPrecision(4));
  }
  increaseCount(index: number) {
    if (this.cart[index].count < this.cart[index].product.stock) {
      this.cartService.changeCount(index, 1);
    }
  }
  decreaseCount(index: number) {
    if (this.cart[index].count > 0) {
      this.cartService.changeCount(index, -1);
    }
  }
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
}

