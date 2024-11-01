import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDetailComponent } from './navigation-detail.component';

describe('NavigationDetailComponent', () => {
  let component: NavigationDetailComponent;
  let fixture: ComponentFixture<NavigationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationDetailComponent]
    });
    fixture = TestBed.createComponent(NavigationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
