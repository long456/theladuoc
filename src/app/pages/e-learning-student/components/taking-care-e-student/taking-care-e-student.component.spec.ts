import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakingCareEStudentComponent } from './taking-care-e-student.component';

describe('TakingCareEStudentComponent', () => {
  let component: TakingCareEStudentComponent;
  let fixture: ComponentFixture<TakingCareEStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakingCareEStudentComponent]
    });
    fixture = TestBed.createComponent(TakingCareEStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
