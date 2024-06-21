import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRouterOutletComponent } from './header-router-outlet.component';

describe('HeaderRouterOutletComponent', () => {
  let component: HeaderRouterOutletComponent;
  let fixture: ComponentFixture<HeaderRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderRouterOutletComponent]
    });
    fixture = TestBed.createComponent(HeaderRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
