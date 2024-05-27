import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachFormComponent } from './attach-form.component';

describe('AttachFormComponent', () => {
  let component: AttachFormComponent;
  let fixture: ComponentFixture<AttachFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachFormComponent]
    });
    fixture = TestBed.createComponent(AttachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
