import { TestBed } from '@angular/core/testing';

import { PermissionGuardService } from './permission-guard.service';

describe('PemissionGuardService', () => {
  let service: PermissionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
