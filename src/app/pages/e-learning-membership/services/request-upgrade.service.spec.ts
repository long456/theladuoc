import { TestBed } from '@angular/core/testing';

import { RequestUpgradeService } from './request-upgrade.service';

describe('RequestUpgradeService', () => {
  let service: RequestUpgradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestUpgradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
