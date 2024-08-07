import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerReportComponent } from './speaker-report.component';

describe('SpeakerReportComponent', () => {
  let component: SpeakerReportComponent;
  let fixture: ComponentFixture<SpeakerReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerReportComponent]
    });
    fixture = TestBed.createComponent(SpeakerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
