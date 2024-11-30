import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { CartItem } from '../interface/cart-item';
import { Course } from '../interface/course';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  private apiUrl = 'http://localhost:3002/cart';

  constructor(private http: HttpClient) { }
  private get cartArray() {
    return this.cart.value;
  }
  getCart() {
    return this.cart.asObservable();
  }
  addToCart(product: Course, count: number) {
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
  /*---------------------------*/
  addToCart2(productId: number, count: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/add`, { productId, count });
  }
  /*----------------------------------------*/
  increaseCount(index: number, count: number) {
    this.cartArray[index].count += count;
    if (this.cartArray[index].count > this.cartArray[index].product.stock) {
      this.cartArray[index].count = this.cartArray[index].product.stock;
    }
  }
  changeCount(index: number, value: number) {
    this.increaseCount(index, value);
  }
  /*-------------------------------------------*/
  removeItem2(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }
  /*----------------------------------------*/

  removeItem(index: number) {
    this.cartArray.splice(index, 1);
  }



  getCart2(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
  getCartTotal(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/total`);
  }

}
