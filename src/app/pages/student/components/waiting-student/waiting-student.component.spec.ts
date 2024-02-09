import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingStudentComponent } from './waiting-student.component';

describe('WaitingStudentComponent', () => {
  let component: WaitingStudentComponent;
  let fixture: ComponentFixture<WaitingStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingStudentComponent]
    });
    fixture = TestBed.createComponent(WaitingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
