import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRouterOutletComponent } from './video-router-outlet.component';

describe('VideoRouterOutletComponent', () => {
  let component: VideoRouterOutletComponent;
  let fixture: ComponentFixture<VideoRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoRouterOutletComponent]
    });
    fixture = TestBed.createComponent(VideoRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
