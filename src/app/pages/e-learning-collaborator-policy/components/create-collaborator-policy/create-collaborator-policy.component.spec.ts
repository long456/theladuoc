import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollaboratorPolicyComponent } from './create-collaborator-policy.component';

describe('CreateCollaboratorPolicyComponent', () => {
  let component: CreateCollaboratorPolicyComponent;
  let fixture: ComponentFixture<CreateCollaboratorPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCollaboratorPolicyComponent]
    });
    fixture = TestBed.createComponent(CreateCollaboratorPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
