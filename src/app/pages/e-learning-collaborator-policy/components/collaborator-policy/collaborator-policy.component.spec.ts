import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorPolicyComponent } from './collaborator-policy.component';

describe('CollaboratorPolicyComponent', () => {
  let component: CollaboratorPolicyComponent;
  let fixture: ComponentFixture<CollaboratorPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorPolicyComponent]
    });
    fixture = TestBed.createComponent(CollaboratorPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
