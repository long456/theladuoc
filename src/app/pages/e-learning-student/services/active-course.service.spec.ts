import { TestBed } from '@angular/core/testing';

import { ActiveCourseService } from './active-course.service';

describe('ActiveCourseService', () => {
  let service: ActiveCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
