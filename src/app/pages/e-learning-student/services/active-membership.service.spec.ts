import { TestBed } from '@angular/core/testing';

import { ActiveMembershipService } from './active-membership.service';

describe('ActiveMembershipService', () => {
  let service: ActiveMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
