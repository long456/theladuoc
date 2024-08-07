import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalesReportComponent } from './staff-sales-report.component';

describe('StaffSalesReportComponent', () => {
  let component: StaffSalesReportComponent;
  let fixture: ComponentFixture<StaffSalesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffSalesReportComponent]
    });
    fixture = TestBed.createComponent(StaffSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
