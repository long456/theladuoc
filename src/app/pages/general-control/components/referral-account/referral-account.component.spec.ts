import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralAccountComponent } from './referral-account.component';

describe('ReferralAccountComponent', () => {
  let component: ReferralAccountComponent;
  let fixture: ComponentFixture<ReferralAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralAccountComponent]
    });
    fixture = TestBed.createComponent(ReferralAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
