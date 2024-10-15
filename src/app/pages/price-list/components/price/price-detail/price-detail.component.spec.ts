import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDetailComponent } from './price-detail.component';

describe('PriceDetailComponent', () => {
  let component: PriceDetailComponent;
  let fixture: ComponentFixture<PriceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceDetailComponent]
    });
    fixture = TestBed.createComponent(PriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
