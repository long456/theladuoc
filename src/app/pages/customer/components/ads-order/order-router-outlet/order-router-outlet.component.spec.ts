import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRouterOutletComponent } from './order-router-outlet.component';

describe('OrderRouterOutletComponent', () => {
  let component: OrderRouterOutletComponent;
  let fixture: ComponentFixture<OrderRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderRouterOutletComponent]
    });
    fixture = TestBed.createComponent(OrderRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
