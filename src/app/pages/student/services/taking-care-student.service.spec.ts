import { TestBed } from '@angular/core/testing';

import { TakingCareStudentService } from './taking-care-student.service';

describe('TakingCareStudentService', () => {
  let service: TakingCareStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakingCareStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
