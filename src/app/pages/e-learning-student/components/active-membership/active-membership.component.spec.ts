import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMembershipComponent } from './active-membership.component';

describe('ActiveMembershipComponent', () => {
  let component: ActiveMembershipComponent;
  let fixture: ComponentFixture<ActiveMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveMembershipComponent]
    });
    fixture = TestBed.createComponent(ActiveMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
