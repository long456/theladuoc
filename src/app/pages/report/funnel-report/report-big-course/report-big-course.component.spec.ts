import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBigCourseComponent } from './report-big-course.component';

describe('ReportBigCourseComponent', () => {
  let component: ReportBigCourseComponent;
  let fixture: ComponentFixture<ReportBigCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportBigCourseComponent]
    });
    fixture = TestBed.createComponent(ReportBigCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
