import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroVideoListComponent } from './intro-video-list.component';

describe('IntroVideoListComponent', () => {
  let component: IntroVideoListComponent;
  let fixture: ComponentFixture<IntroVideoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroVideoListComponent]
    });
    fixture = TestBed.createComponent(IntroVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
