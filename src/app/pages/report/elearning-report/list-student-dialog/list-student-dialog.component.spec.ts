import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentDialogComponent } from './list-student-dialog.component';

describe('ListStudentDialogComponent', () => {
  let component: ListStudentDialogComponent;
  let fixture: ComponentFixture<ListStudentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStudentDialogComponent]
    });
    fixture = TestBed.createComponent(ListStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
