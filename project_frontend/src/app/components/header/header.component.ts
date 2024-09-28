import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cart: Product[] = [];
  constructor(private cartService: CartService){}
  ngOnInit() {
    this.cartService.getCart().subscribe((data: any) => this.cart = data);
  }
}
