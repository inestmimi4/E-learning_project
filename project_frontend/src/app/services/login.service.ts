import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3002/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    console.log('Login attempt:', email, password);
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(user => {
        console.log('Login successful:', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loginStatus.emit(true); // Emit login status change

        return user;
      }),
      catchError(error => {
        console.error('Login failed', error);
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 3000,
        });
        return throwError(error);
      })
    );
  }

  logout() {
    console.log('Logout');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loginStatus.emit(false); // Emit login status change
    this.snackBar.open('Logged out successfully', 'Close', {
      duration: 3000,
    });
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.currentUserValue;
    console.log('Is logged in:', loggedIn);
    return loggedIn;
  }
}
