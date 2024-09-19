import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourcesComponent } from './create-resources.component';

describe('CreateResourcesComponent', () => {
  let component: CreateResourcesComponent;
  let fixture: ComponentFixture<CreateResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateResourcesComponent]
    });
    fixture = TestBed.createComponent(CreateResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
