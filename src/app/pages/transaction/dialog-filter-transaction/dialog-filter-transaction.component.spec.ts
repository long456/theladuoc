import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilterTransactionComponent } from './dialog-filter-transaction.component';

describe('DialogFilterTransactionComponent', () => {
  let component: DialogFilterTransactionComponent;
  let fixture: ComponentFixture<DialogFilterTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFilterTransactionComponent]
    });
    fixture = TestBed.createComponent(DialogFilterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
