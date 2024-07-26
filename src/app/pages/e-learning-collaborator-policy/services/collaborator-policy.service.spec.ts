import { TestBed } from '@angular/core/testing';

import { CollaboratorPolicyService } from './collaborator-policy.service';

describe('CollaboratorPolicyService', () => {
  let service: CollaboratorPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
