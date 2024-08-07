import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUpgradeComponent } from './request-upgrade.component';

describe('RequestUpgradeComponent', () => {
  let component: RequestUpgradeComponent;
  let fixture: ComponentFixture<RequestUpgradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestUpgradeComponent]
    });
    fixture = TestBed.createComponent(RequestUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
