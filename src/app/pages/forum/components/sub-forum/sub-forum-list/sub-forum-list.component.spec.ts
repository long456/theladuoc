import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubForumListComponent } from './sub-forum-list.component';

describe('SubForumListComponent', () => {
  let component: SubForumListComponent;
  let fixture: ComponentFixture<SubForumListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubForumListComponent]
    });
    fixture = TestBed.createComponent(SubForumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
