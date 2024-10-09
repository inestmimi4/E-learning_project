import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../interface/course';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  products: Course[] = [];
  readonly URL: string = 'http://localhost:3001/products';
  constructor(private http: HttpClient) { }

  getProductList(): Observable<Course[]> {
    return this.http.get<Course[]>(this.URL);
  }
  getProductWithId(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.URL}/${id}`);
  }
}
