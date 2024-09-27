import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumConfigComponent } from './forum-config.component';

describe('ForumConfigComponent', () => {
  let component: ForumConfigComponent;
  let fixture: ComponentFixture<ForumConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumConfigComponent]
    });
    fixture = TestBed.createComponent(ForumConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
