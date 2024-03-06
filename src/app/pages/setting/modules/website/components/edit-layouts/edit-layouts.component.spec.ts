import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayoutsComponent } from './edit-layouts.component';

describe('EditLayoutsComponent', () => {
  let component: EditLayoutsComponent;
  let fixture: ComponentFixture<EditLayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLayoutsComponent]
    });
    fixture = TestBed.createComponent(EditLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
