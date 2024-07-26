import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyingEStudentComponent } from './studying-e-student.component';

describe('StudyingEStudentComponent', () => {
  let component: StudyingEStudentComponent;
  let fixture: ComponentFixture<StudyingEStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyingEStudentComponent]
    });
    fixture = TestBed.createComponent(StudyingEStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
