import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipListComponent } from './membership-list.component';

describe('MembershipListComponent', () => {
  let component: MembershipListComponent;
  let fixture: ComponentFixture<MembershipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipListComponent]
    });
    fixture = TestBed.createComponent(MembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
