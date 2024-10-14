import { TestBed } from '@angular/core/testing';

import { BusinessAccessService } from './business-access.service';

describe('BusinessAccessService', () => {
  let service: BusinessAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
