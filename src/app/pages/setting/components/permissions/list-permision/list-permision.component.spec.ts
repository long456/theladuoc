import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermisionComponent } from './list-permision.component';

describe('ListPermisionComponent', () => {
  let component: ListPermisionComponent;
  let fixture: ComponentFixture<ListPermisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPermisionComponent]
    });
    fixture = TestBed.createComponent(ListPermisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
