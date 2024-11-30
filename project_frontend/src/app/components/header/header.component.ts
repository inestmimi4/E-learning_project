import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CartService } from '../../services/cart-service';
import { Course } from '../../interface/course';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cart: Course[] = [];
  userName: string = '';
  constructor(private cartService: CartService,private router: Router){}
  ngOnInit() {
    this.cartService.getCart().subscribe((data: any) => this.cart = data);
    this.checkLoginStatus();
  }
  isLoggedIn: boolean = false;


  checkLoginStatus(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.isLoggedIn = true;
      const user = JSON.parse(currentUser); // Parse the user from localStorage
      this.userName = user.email; // Ou utiliser user.name si vous avez le nom complet
    } else {
      this.isLoggedIn = false;
      this.userName = '';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
