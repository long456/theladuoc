import { TestBed } from '@angular/core/testing';

import { FooterConfigService } from './footer-config.service';

describe('FooterConfigService', () => {
  let service: FooterConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
