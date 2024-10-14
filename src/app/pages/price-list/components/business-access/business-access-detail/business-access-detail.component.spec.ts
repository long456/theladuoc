import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccessDetailComponent } from './business-access-detail.component';

describe('BusinessAccessDetailComponent', () => {
  let component: BusinessAccessDetailComponent;
  let fixture: ComponentFixture<BusinessAccessDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessAccessDetailComponent]
    });
    fixture = TestBed.createComponent(BusinessAccessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
