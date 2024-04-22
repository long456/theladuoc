import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachClassComponent } from './attach-class.component';

describe('AttachClassComponent', () => {
  let component: AttachClassComponent;
  let fixture: ComponentFixture<AttachClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachClassComponent]
    });
    fixture = TestBed.createComponent(AttachClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
