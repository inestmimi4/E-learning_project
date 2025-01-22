import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesearchComponent } from './coursesearch.component';

describe('CoursesearchComponent', () => {
  let component: CoursesearchComponent;
  let fixture: ComponentFixture<CoursesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
