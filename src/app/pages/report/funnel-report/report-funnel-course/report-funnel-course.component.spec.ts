import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFunnelCourseComponent } from './report-funnel-course.component';

describe('ReportFunnelCourseComponent', () => {
  let component: ReportFunnelCourseComponent;
  let fixture: ComponentFixture<ReportFunnelCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportFunnelCourseComponent]
    });
    fixture = TestBed.createComponent(ReportFunnelCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
