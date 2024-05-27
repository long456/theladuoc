import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLandingPageComponent } from './create-landing-page.component';

describe('CreateLandingPageComponent', () => {
  let component: CreateLandingPageComponent;
  let fixture: ComponentFixture<CreateLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLandingPageComponent]
    });
    fixture = TestBed.createComponent(CreateLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
