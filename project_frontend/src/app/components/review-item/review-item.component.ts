import { Component, Input } from '@angular/core';
import { Review } from '../../interface/review';
import { StarsComponent } from '../stars/stars.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [StarsComponent, DatePipe],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css'
})
export class ReviewItemComponent {
  @Input() data!: Review;
}
