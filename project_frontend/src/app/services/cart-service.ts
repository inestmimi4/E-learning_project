import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interface/cart-item';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  constructor() { }
  private get cartArray() {
    return this.cart.value;
  }
  getCart() {
    return this.cart.asObservable();
  }
  addToCart(product: Product, count: number) {
    let index = this.cartArray.findIndex(e => e.product.id == product.id);
    if (index == -1) {
      this.cartArray.push({
        product: product,
        count: count
      });
    } else {
      this.increaseCount(index, count);
    }
  }
  increaseCount(index: number, count: number) {
    this.cartArray[index].count += count;
    if (this.cartArray[index].count > this.cartArray[index].product.stock) {
      this.cartArray[index].count = this.cartArray[index].product.stock;
    }
  }
  changeCount(index: number, value: number) {
    this.increaseCount(index, value);
  }
  removeItem(index: number) {
    this.cartArray.splice(index, 1);
  }
}
