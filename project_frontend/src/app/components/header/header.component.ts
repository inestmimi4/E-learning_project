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

  constructor(private cartService: CartService, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((data: any) => this.cart = data);
    this.checkLoginStatus();

    // Subscribe to login status changes
    this.loginService.loginStatus.subscribe((status: boolean) => {
      console.log('Login status changed:', status);
      this.isLoggedIn = status;
      if (status) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.userName = user.email;
        console.log('User logged in:', this.userName);
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
      const user = JSON.parse(currentUser);
      this.userName = user.email;
      console.log('Current user:', this.userName);
    } else {
      this.isLoggedIn = false;
      this.userName = '';
      console.log('No user logged in');
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
