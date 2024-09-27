import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCategoryDetailComponent } from './forum-category-detail.component';

describe('ForumCategoryDetailComponent', () => {
  let component: ForumCategoryDetailComponent;
  let fixture: ComponentFixture<ForumCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumCategoryDetailComponent]
    });
    fixture = TestBed.createComponent(ForumCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
