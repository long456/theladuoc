import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterElearningCourseReportComponent } from './filter-elearning-course-report.component';

describe('FilterElearningCourseReportComponent', () => {
  let component: FilterElearningCourseReportComponent;
  let fixture: ComponentFixture<FilterElearningCourseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterElearningCourseReportComponent]
    });
    fixture = TestBed.createComponent(FilterElearningCourseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
