import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRouterOutletComponent } from './config-router-outlet.component';

describe('ConfigRouterOutletComponent', () => {
  let component: ConfigRouterOutletComponent;
  let fixture: ComponentFixture<ConfigRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigRouterOutletComponent]
    });
    fixture = TestBed.createComponent(ConfigRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
