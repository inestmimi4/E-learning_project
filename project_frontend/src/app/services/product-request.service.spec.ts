import { TestBed } from '@angular/core/testing';

import { ProductRequestService } from './product-request.service';

describe('ProductRequestService', () => {
  let service: ProductRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
