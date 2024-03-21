import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailComponent } from './system-email.component';

describe('SystemEmailComponent', () => {
  let component: SystemEmailComponent;
  let fixture: ComponentFixture<SystemEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemEmailComponent]
    });
    fixture = TestBed.createComponent(SystemEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
