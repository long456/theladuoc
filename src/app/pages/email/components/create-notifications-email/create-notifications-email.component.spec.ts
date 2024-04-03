import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotificationsEmailComponent } from './create-notifications-email.component';

describe('CreateNotificationsEmailComponent', () => {
  let component: CreateNotificationsEmailComponent;
  let fixture: ComponentFixture<CreateNotificationsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNotificationsEmailComponent]
    });
    fixture = TestBed.createComponent(CreateNotificationsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
