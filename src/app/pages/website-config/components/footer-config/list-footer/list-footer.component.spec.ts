import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFooterComponent } from './list-footer.component';

describe('ListFooterComponent', () => {
  let component: ListFooterComponent;
  let fixture: ComponentFixture<ListFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFooterComponent]
    });
    fixture = TestBed.createComponent(ListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
