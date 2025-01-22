import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Course } from '../../interface/course';
import { ProductRequestService } from '../../services/product-request.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../interface/cart-item';
import {AiAssistantComponent} from "../../pages/ai-assistant/ai-assistant.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProductCardComponent, AiAssistantComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  productList: Course[] = [];
  cart: CartItem[] = [];
  productSub!: Subscription;
  cartSub!: Subscription;
  constructor(private productService: ProductRequestService, private cartService: CartService,private router: Router) {}

  ngOnInit(){
    this.productSub = this.productService.getProductList().subscribe((data: Course[]) => {
      this.productList = data;
      console.log(this.productList);
    });
    this.cartSub = this.cartService.getCart().subscribe((data: any) => this.cart = data);
    console.log(this.productList);
  }
  addToCart(product: Course) {
    let count = 1;
    this.cartService.addToCart(product, count);
  }
  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
