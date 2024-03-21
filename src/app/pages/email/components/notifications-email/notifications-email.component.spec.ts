import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEmailComponent } from './notifications-email.component';

describe('NotificationsEmailComponent', () => {
  let component: NotificationsEmailComponent;
  let fixture: ComponentFixture<NotificationsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsEmailComponent]
    });
    fixture = TestBed.createComponent(NotificationsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
