import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCollaboratorCourseComponent } from './report-collaborator-course.component';

describe('ReportCollaboratorCourseComponent', () => {
  let component: ReportCollaboratorCourseComponent;
  let fixture: ComponentFixture<ReportCollaboratorCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCollaboratorCourseComponent]
    });
    fixture = TestBed.createComponent(ReportCollaboratorCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
