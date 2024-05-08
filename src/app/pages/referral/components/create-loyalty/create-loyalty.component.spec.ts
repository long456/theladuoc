import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoyaltyComponent } from './create-loyalty.component';

describe('CreateLoyaltyComponent', () => {
  let component: CreateLoyaltyComponent;
  let fixture: ComponentFixture<CreateLoyaltyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLoyaltyComponent]
    });
    fixture = TestBed.createComponent(CreateLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
