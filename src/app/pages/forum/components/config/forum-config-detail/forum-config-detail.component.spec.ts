import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumConfigDetailComponent } from './forum-config-detail.component';

describe('ForumConfigDetailComponent', () => {
  let component: ForumConfigDetailComponent;
  let fixture: ComponentFixture<ForumConfigDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumConfigDetailComponent]
    });
    fixture = TestBed.createComponent(ForumConfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
