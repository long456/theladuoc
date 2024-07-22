import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDividedEStudentComponent } from './non-divided-e-student.component';

describe('NonDividedEStudentComponent', () => {
  let component: NonDividedEStudentComponent;
  let fixture: ComponentFixture<NonDividedEStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonDividedEStudentComponent]
    });
    fixture = TestBed.createComponent(NonDividedEStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
