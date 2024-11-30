import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3002/register';  // URL of your Express backend

  constructor(private http: HttpClient) { }

  register(user: { name: string, email: string, username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

