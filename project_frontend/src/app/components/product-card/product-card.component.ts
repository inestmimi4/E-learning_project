import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Course } from '../../interface/course';
import { Router } from '@angular/router';
import { StarsComponent } from '../stars/stars.component';
import {Review} from "../../interface/review";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [StarsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() data!: Course;

  @Output() productEmitter = new EventEmitter<Course>();
  @ViewChild('favoriteIcon') favoriteIconView: any;
  isFavorite: boolean = false;

  constructor (private router: Router) {}

  sendId(id: number) {
    this.router.navigate(['/product', id]);
  }
  addToCart(event: Event) {
    event.stopPropagation();
    this.productEmitter.emit(this.data);
  }
  toggleFavorite(event: Event) {
    event.stopPropagation();
    if (this.isFavorite) {
      this.removeFromFavorite();
    } else {
      this.addToFavorite();
    }
    this.isFavorite = !this.isFavorite;
  }
  addToFavorite() {
    let icon: any = this.favoriteIconView.nativeElement;
    icon.className = icon.className.replace('fa-heart-o', 'fa-heart');
  }
  removeFromFavorite() {
    let icon: any = this.favoriteIconView.nativeElement;
    icon.className = icon.className.replace('fa-heart', 'fa-heart-o');
  }
}
