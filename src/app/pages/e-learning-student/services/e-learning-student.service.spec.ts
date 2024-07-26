import { TestBed } from '@angular/core/testing';

import { ELearningStudentService } from './e-learning-student.service';

describe('ELearningStudentService', () => {
  let service: ELearningStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ELearningStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
