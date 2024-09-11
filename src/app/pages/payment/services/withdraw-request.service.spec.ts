import { TestBed } from '@angular/core/testing';

import { WithdrawRequestService } from './withdraw-request.service';

describe('WithdrawRequestService', () => {
  let service: WithdrawRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
