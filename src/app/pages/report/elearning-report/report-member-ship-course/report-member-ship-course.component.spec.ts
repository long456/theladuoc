import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMemberShipCourseComponent } from './report-member-ship-course.component';

describe('ReportMemberShipCourseComponent', () => {
  let component: ReportMemberShipCourseComponent;
  let fixture: ComponentFixture<ReportMemberShipCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportMemberShipCourseComponent]
    });
    fixture = TestBed.createComponent(ReportMemberShipCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
