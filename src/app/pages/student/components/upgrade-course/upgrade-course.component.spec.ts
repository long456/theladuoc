import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCourseComponent } from './upgrade-course.component';

describe('UpgradeCourseComponent', () => {
  let component: UpgradeCourseComponent;
  let fixture: ComponentFixture<UpgradeCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeCourseComponent]
    });
    fixture = TestBed.createComponent(UpgradeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
