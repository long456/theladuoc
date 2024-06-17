import { TestBed } from '@angular/core/testing';

import { PaymentAuthService } from './payment-auth.service';

describe('PaymentAuthService', () => {
  let service: PaymentAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
