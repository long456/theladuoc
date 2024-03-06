import { TestBed } from '@angular/core/testing';

import { StudyingStudentService } from './studying-student.service';

describe('StudyingStudentService', () => {
  let service: StudyingStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyingStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
