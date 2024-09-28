import { Component, Inject, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Product } from '../../interface/product';
import { PriceDiscountPipe } from '../../pipe/price-discount.pipe';
import { StarsComponent } from "../../components/stars/stars.component";
import { ReviewItemComponent } from '../../components/review-item/review-item.component';
import { ProductRequestService } from '../../services/product-request.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../interface/cart-item';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, PriceDiscountPipe, StarsComponent, ReviewItemComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  id: number;
  data!: Product;
  productSub!: Subscription;
  cartSub!: Subscription;
  cart: CartItem[] = [];

  @ViewChild('itemCount') itemCount: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductRequestService,
    private cartService: CartService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.productSub = this.productService.getProductWithId(this.id).subscribe((data: any) => {
      this.data = data;
    });
    this.cartSub = this.cartService.getCart().subscribe((data: any) => {
      this.cart = data;
    });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

  get count() {
    return Number(this.itemCount.nativeElement.innerText);

  }
  set count(count: number) {
    this.itemCount.nativeElement.innerText = count;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.count);
  }

  increase() {
    if (this.count < this.data.stock) {
      this.count = this.count + 1;
    }
  }
  decrease() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
  }
  navigateToSection(section: string) {
    window.location.hash = section;
  }

}


