import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPaidCourseComponent } from './report-paid-course.component';

describe('ReportPaidCourseComponent', () => {
  let component: ReportPaidCourseComponent;
  let fixture: ComponentFixture<ReportPaidCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportPaidCourseComponent]
    });
    fixture = TestBed.createComponent(ReportPaidCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
