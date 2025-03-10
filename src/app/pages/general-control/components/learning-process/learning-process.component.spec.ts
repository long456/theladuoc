import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningProcessComponent } from './learning-process.component';

describe('LearningProcessComponent', () => {
  let component: LearningProcessComponent;
  let fixture: ComponentFixture<LearningProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningProcessComponent]
    });
    fixture = TestBed.createComponent(LearningProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
