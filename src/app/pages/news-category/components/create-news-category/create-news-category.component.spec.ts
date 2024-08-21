import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsCategoryComponent } from './create-news-category.component';

describe('CreateNewsCategoryComponent', () => {
  let component: CreateNewsCategoryComponent;
  let fixture: ComponentFixture<CreateNewsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewsCategoryComponent]
    });
    fixture = TestBed.createComponent(CreateNewsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
