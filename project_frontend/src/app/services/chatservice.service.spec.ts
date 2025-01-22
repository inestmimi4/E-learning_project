import { TestBed } from '@angular/core/testing';

import { ChatserviceService } from './chatservice.service';

describe('ChatserviceService', () => {
  let service: ChatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
