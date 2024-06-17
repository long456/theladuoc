import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFreeCourseComponent } from './report-free-course.component';

describe('ReportFreeCourseComponent', () => {
  let component: ReportFreeCourseComponent;
  let fixture: ComponentFixture<ReportFreeCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportFreeCourseComponent]
    });
    fixture = TestBed.createComponent(ReportFreeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
