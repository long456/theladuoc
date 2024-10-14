import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitConfigComponent } from './benefit-config.component';

describe('BenefitConfigComponent', () => {
  let component: BenefitConfigComponent;
  let fixture: ComponentFixture<BenefitConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitConfigComponent]
    });
    fixture = TestBed.createComponent(BenefitConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
