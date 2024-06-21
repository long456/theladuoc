import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFooterComponent } from './edit-footer.component';

describe('EditFooterComponent', () => {
  let component: EditFooterComponent;
  let fixture: ComponentFixture<EditFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFooterComponent]
    });
    fixture = TestBed.createComponent(EditFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
