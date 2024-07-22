import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteringEStudentComponent } from './registering-e-student.component';

describe('RegisteringEStudentComponent', () => {
  let component: RegisteringEStudentComponent;
  let fixture: ComponentFixture<RegisteringEStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteringEStudentComponent]
    });
    fixture = TestBed.createComponent(RegisteringEStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
