import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyingStudentComponent } from './studying-student.component';

describe('StudyingStudentComponent', () => {
  let component: StudyingStudentComponent;
  let fixture: ComponentFixture<StudyingStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyingStudentComponent]
    });
    fixture = TestBed.createComponent(StudyingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
