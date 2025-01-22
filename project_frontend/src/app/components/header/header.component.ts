import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { LoginService } from '../../services/login.service';
import { Course } from '../../interface/course';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [NgIf, RouterModule]
})
export class HeaderComponent implements OnInit {
  cart: Course[] = [];
  userName: string = '';
  isLoggedIn: boolean = false;

  constructor(private cartService: CartService, protected loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((data: any) => this.cart = data);
    this.checkLoginStatus();

    // Subscribe to login status changes
    this.loginService.loginStatus.subscribe((status: boolean) => {
      console.log('Login status changed:', status);
      this.isLoggedIn = status;
      if (status) {
        this.loadUserFromLocalStorage();
      } else {
        this.userName = '';
        console.log('User logged out');
      }
    });
  }

  checkLoginStatus(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.isLoggedIn = true;
      this.loadUserFromLocalStorage();
    } else {
      this.isLoggedIn = false;
      this.userName = '';
      console.log('No user logged in');
    }
  }

  loadUserFromLocalStorage(): void {
    try {
      const storedUser = localStorage.getItem('currentUser');
      console.log('Raw stored user from localStorage:', storedUser); // Vérification brute avant parsing

      const user = storedUser ? JSON.parse(storedUser) : null;
      console.log('Parsed current user:', user);

      if (user && user.name) {
        this.userName = user.email;
        console.log('Current user:', this.userName);
      } else {
        console.warn('User data not found in stored user data:', user);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }




  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
