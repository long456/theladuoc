import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakingCareStudentComponent } from './taking-care-student.component';

describe('TakingCareStudentComponent', () => {
  let component: TakingCareStudentComponent;
  let fixture: ComponentFixture<TakingCareStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakingCareStudentComponent]
    });
    fixture = TestBed.createComponent(TakingCareStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
