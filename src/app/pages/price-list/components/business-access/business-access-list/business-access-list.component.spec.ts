import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccessListComponent } from './business-access-list.component';

describe('BusinessAccessListComponent', () => {
  let component: BusinessAccessListComponent;
  let fixture: ComponentFixture<BusinessAccessListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessAccessListComponent]
    });
    fixture = TestBed.createComponent(BusinessAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
