import { TestBed } from '@angular/core/testing';

import { ECourseService } from './e-course.service';

describe('ECourseService', () => {
  let service: ECourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
