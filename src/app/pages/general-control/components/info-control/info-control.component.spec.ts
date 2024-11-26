import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoControlComponent } from './info-control.component';

describe('InfoControlComponent', () => {
  let component: InfoControlComponent;
  let fixture: ComponentFixture<InfoControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoControlComponent]
    });
    fixture = TestBed.createComponent(InfoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
