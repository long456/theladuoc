import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalCoursesComponent } from './optional-courses.component';

describe('OptionalCoursesComponent', () => {
  let component: OptionalCoursesComponent;
  let fixture: ComponentFixture<OptionalCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionalCoursesComponent]
    });
    fixture = TestBed.createComponent(OptionalCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
