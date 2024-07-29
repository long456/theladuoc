import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembershipComponent } from './create-membership.component';

describe('CreateMembershipComponent', () => {
  let component: CreateMembershipComponent;
  let fixture: ComponentFixture<CreateMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMembershipComponent]
    });
    fixture = TestBed.createComponent(CreateMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
