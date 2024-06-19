import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFunnelCourseReportComponent } from './filter-funnel-course-report.component';

describe('FilterFunnelCourseReportComponent', () => {
  let component: FilterFunnelCourseReportComponent;
  let fixture: ComponentFixture<FilterFunnelCourseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterFunnelCourseReportComponent]
    });
    fixture = TestBed.createComponent(FilterFunnelCourseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
