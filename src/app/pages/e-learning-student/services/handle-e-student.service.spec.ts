import { TestBed } from '@angular/core/testing';

import { HandleEStudentService } from './handle-e-student.service';

describe('HandleEStudentService', () => {
  let service: HandleEStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleEStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
