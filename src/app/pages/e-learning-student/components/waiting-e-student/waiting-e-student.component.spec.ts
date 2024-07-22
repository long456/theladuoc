import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingEStudentComponent } from './waiting-e-student.component';

describe('WaitingEStudentComponent', () => {
  let component: WaitingEStudentComponent;
  let fixture: ComponentFixture<WaitingEStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingEStudentComponent]
    });
    fixture = TestBed.createComponent(WaitingEStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
