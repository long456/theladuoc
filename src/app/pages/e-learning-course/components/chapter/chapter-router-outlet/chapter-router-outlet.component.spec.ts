import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterRouterOutletComponent } from './chapter-router-outlet.component';

describe('ChapterRouterOutletComponent', () => {
  let component: ChapterRouterOutletComponent;
  let fixture: ComponentFixture<ChapterRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterRouterOutletComponent]
    });
    fixture = TestBed.createComponent(ChapterRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
