import { TestBed } from '@angular/core/testing';

import { ReviewproductService } from './reviewproduct.service';

describe('ReviewproductService', () => {
  let service: ReviewproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
