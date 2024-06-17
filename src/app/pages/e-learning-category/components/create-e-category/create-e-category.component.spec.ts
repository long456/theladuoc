import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateECategoryComponent } from './create-e-category.component';

describe('CreateECategoryComponent', () => {
  let component: CreateECategoryComponent;
  let fixture: ComponentFixture<CreateECategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateECategoryComponent]
    });
    fixture = TestBed.createComponent(CreateECategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
