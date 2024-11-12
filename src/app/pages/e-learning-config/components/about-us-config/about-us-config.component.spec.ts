import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsConfigComponent } from './about-us-config.component';

describe('AboutUsConfigComponent', () => {
  let component: AboutUsConfigComponent;
  let fixture: ComponentFixture<AboutUsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsConfigComponent]
    });
    fixture = TestBed.createComponent(AboutUsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
