import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEmailListComponent } from './notifications-email-list.component';

describe('NotificationsEmailListComponent', () => {
  let component: NotificationsEmailListComponent;
  let fixture: ComponentFixture<NotificationsEmailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsEmailListComponent]
    });
    fixture = TestBed.createComponent(NotificationsEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
