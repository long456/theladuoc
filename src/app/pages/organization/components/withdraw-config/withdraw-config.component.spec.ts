import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawConfigComponent } from './withdraw-config.component';

describe('WithdrawConfigComponent', () => {
  let component: WithdrawConfigComponent;
  let fixture: ComponentFixture<WithdrawConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawConfigComponent]
    });
    fixture = TestBed.createComponent(WithdrawConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
