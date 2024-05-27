import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailListComponent } from './system-email-list.component';

describe('SystemEmailListComponent', () => {
  let component: SystemEmailListComponent;
  let fixture: ComponentFixture<SystemEmailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemEmailListComponent]
    });
    fixture = TestBed.createComponent(SystemEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
