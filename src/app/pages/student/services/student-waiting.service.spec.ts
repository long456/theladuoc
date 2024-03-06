import { TestBed } from '@angular/core/testing';

import { StudentWaitingService } from './student-waiting.service';

describe('StudentWaitingService', () => {
  let service: StudentWaitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentWaitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
