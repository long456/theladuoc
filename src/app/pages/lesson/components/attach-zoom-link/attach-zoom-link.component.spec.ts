import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachZoomLinkComponent } from './attach-zoom-link.component';

describe('AttachZoomLinkComponent', () => {
  let component: AttachZoomLinkComponent;
  let fixture: ComponentFixture<AttachZoomLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachZoomLinkComponent]
    });
    fixture = TestBed.createComponent(AttachZoomLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
