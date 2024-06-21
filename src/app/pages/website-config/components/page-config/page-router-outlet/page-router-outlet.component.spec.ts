import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRouterOutletComponent } from './page-router-outlet.component';

describe('PageRouterOutletComponent', () => {
  let component: PageRouterOutletComponent;
  let fixture: ComponentFixture<PageRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRouterOutletComponent]
    });
    fixture = TestBed.createComponent(PageRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
