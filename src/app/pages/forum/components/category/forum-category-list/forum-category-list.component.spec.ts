import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCategoryListComponent } from './forum-category-list.component';

describe('ForumCategoryListComponent', () => {
  let component: ForumCategoryListComponent;
  let fixture: ComponentFixture<ForumCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumCategoryListComponent]
    });
    fixture = TestBed.createComponent(ForumCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
