import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInstructorCourseComponent } from './report-instructor-course.component';

describe('ReportInstructorCourseComponent', () => {
  let component: ReportInstructorCourseComponent;
  let fixture: ComponentFixture<ReportInstructorCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportInstructorCourseComponent]
    });
    fixture = TestBed.createComponent(ReportInstructorCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
