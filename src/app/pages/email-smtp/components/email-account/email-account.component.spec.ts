import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountComponent } from './email-account.component';

describe('EmailAccountComponent', () => {
  let component: EmailAccountComponent;
  let fixture: ComponentFixture<EmailAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailAccountComponent]
    });
    fixture = TestBed.createComponent(EmailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
