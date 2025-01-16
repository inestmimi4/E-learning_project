import { Component, Inject, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Course } from '../../interface/course';
import { PriceDiscountPipe } from '../../pipe/price-discount.pipe';
import { StarsComponent } from "../../components/stars/stars.component";
import { ReviewItemComponent } from '../../components/review-item/review-item.component';
import { ProductRequestService } from '../../services/product-request.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../interface/cart-item';
import {ReviewproductService} from "../../services/reviewproduct.service";
import {Review} from "../../interface/review";
import {AddCommentComponent} from "../../components/add-comment/add-comment.component";


@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, PriceDiscountPipe, StarsComponent, ReviewItemComponent, AddCommentComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  id: number;
  data!: Course;
  data1: Review[] = [];
  productSub!: Subscription;
  cartSub!: Subscription;
  cart: CartItem[] = [];

  @ViewChild('itemCount') itemCount: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductRequestService,
    private cartService: CartService,
    private reviewService : ReviewproductService
) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.productSub = this.productService.getProductWithId(this.id).subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
    this.reviewService.getReviewsForProduct(this.id).subscribe((data: Review[]) => {
      if (Array.isArray(data)) {
        this.data1 = data;
        console.log(this.data1);
      } else {
        console.error('Les données reçues ne sont pas un tableau');
      }
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

  addToCart(product: Course) {
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


