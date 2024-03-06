import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionOrganizationComponent } from './permission-organization.component';

describe('PermissionOrganizationComponent', () => {
  let component: PermissionOrganizationComponent;
  let fixture: ComponentFixture<PermissionOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionOrganizationComponent]
    });
    fixture = TestBed.createComponent(PermissionOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
