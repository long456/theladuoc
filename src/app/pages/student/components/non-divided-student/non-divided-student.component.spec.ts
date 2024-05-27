import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDividedStudentComponent } from './non-divided-student.component';

describe('NonDividedStudentComponent', () => {
  let component: NonDividedStudentComponent;
  let fixture: ComponentFixture<NonDividedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonDividedStudentComponent]
    });
    fixture = TestBed.createComponent(NonDividedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
