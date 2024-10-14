import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitDetailComponent } from './benefit-detail.component';

describe('BenefitDetailComponent', () => {
  let component: BenefitDetailComponent;
  let fixture: ComponentFixture<BenefitDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitDetailComponent]
    });
    fixture = TestBed.createComponent(BenefitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
