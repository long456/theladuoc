import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubForumDetailComponent } from './sub-forum-detail.component';

describe('SubForumDetailComponent', () => {
  let component: SubForumDetailComponent;
  let fixture: ComponentFixture<SubForumDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubForumDetailComponent]
    });
    fixture = TestBed.createComponent(SubForumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
