import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateECourseComponent } from './create-e-course.component';

describe('CreateECourseComponent', () => {
  let component: CreateECourseComponent;
  let fixture: ComponentFixture<CreateECourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateECourseComponent]
    });
    fixture = TestBed.createComponent(CreateECourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
