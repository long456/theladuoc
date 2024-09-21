import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroVideoDetailComponent } from './intro-video-detail.component';

describe('IntroVideoDetailComponent', () => {
  let component: IntroVideoDetailComponent;
  let fixture: ComponentFixture<IntroVideoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroVideoDetailComponent]
    });
    fixture = TestBed.createComponent(IntroVideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
