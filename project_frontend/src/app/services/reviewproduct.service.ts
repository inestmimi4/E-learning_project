import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Review} from "../interface/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewproductService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getReviewsForProduct(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/${productId}`);
  }
}
