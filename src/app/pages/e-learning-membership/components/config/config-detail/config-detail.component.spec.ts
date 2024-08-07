import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDetailComponent } from './config-detail.component';

describe('ConfigDetailComponent', () => {
  let component: ConfigDetailComponent;
  let fixture: ComponentFixture<ConfigDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDetailComponent]
    });
    fixture = TestBed.createComponent(ConfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
