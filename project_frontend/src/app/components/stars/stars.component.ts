import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css'
})
export class StarsComponent {
  @ViewChild('rating') ratingView: any;
  @Input() rating!: number;
  ngAfterViewInit(): void {
    let ratingDiv = this.ratingView.nativeElement;
    let left: number = Number((this.rating * 20).toPrecision(4));
    let right: number = Number((100 - left).toPrecision(4));
    ratingDiv.style['background-image'] = `linear-gradient(90deg, #fdce54 ${left}%, #ebebeb ${right}%)`;
  }
}


