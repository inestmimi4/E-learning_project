import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from '../../services/product-request.service';
import { Course } from '../../interface/course';
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-coursesearch',
  standalone: true,
  imports: [
    ProductCardComponent,
    FormsModule,
    NgForOf
  ],
  templateUrl: './coursesearch.component.html',
  styleUrls: ['./coursesearch.component.css']
})
export class CourseSearchComponent implements OnInit {
  searchQuery: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(private productService: ProductRequestService) {}

  ngOnInit() {
    this.productService.getProductList().subscribe((data: Course[]) => {
      this.courses = data;
      const savedQuery = localStorage.getItem('searchQuery');
      if (savedQuery) {
        this.searchQuery = savedQuery;
        this.onSearch();
      } else {
        this.filteredCourses = data;
      }
    });
  }

  onSearch() {
    localStorage.setItem('searchQuery', this.searchQuery);
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
