import { TestBed } from '@angular/core/testing';

import { PaymentRefundService } from './payment-refund.service';

describe('PaymentRefundService', () => {
  let service: PaymentRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
