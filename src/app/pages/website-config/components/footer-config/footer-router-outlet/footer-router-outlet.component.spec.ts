import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterRouterOutletComponent } from './footer-router-outlet.component';

describe('FooterRouterOutletComponent', () => {
  let component: FooterRouterOutletComponent;
  let fixture: ComponentFixture<FooterRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterRouterOutletComponent]
    });
    fixture = TestBed.createComponent(FooterRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
