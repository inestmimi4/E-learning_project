import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  products: Product[] = [];
  readonly URL: string = 'http://localhost:3001/products';
  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }
  getProductWithId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }
}
