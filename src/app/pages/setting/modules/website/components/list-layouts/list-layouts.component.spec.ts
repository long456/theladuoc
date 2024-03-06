import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLayoutsComponent } from './list-layouts.component';

describe('LayoutsComponent', () => {
  let component: ListLayoutsComponent;
  let fixture: ComponentFixture<ListLayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLayoutsComponent]
    });
    fixture = TestBed.createComponent(ListLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
