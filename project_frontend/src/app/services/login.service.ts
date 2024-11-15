import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3002/login'; // Update this to the correct URL of your API
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Initialize currentUserSubject to track the logged-in user
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Returns the current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login function
  login(email: string, password: string) {
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((user) => {
        // Store user details and token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user); // Update the subject
        return user;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  // Logout function
  logout() {
    // Remove user from local storage and set currentUser to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserValue; // Check if user object exists
  }
}
