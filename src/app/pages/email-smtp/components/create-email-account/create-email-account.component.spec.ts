import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailAccountComponent } from './create-email-account.component';

describe('CreateEmailAccountComponent', () => {
  let component: CreateEmailAccountComponent;
  let fixture: ComponentFixture<CreateEmailAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmailAccountComponent]
    });
    fixture = TestBed.createComponent(CreateEmailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
