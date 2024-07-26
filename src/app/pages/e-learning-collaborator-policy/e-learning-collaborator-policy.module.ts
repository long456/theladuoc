import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ELearningCollaboratorPolicyRoutingModule} from "./e-learning-collaborator-policy-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CollaboratorPolicyComponent } from './components/collaborator-policy/collaborator-policy.component';
import { CreateCollaboratorPolicyComponent } from './components/create-collaborator-policy/create-collaborator-policy.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    CollaboratorPolicyComponent,
    CreateCollaboratorPolicyComponent
  ],
  imports: [
    CommonModule,
    ELearningCollaboratorPolicyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzDividerModule
  ]
})
export class ELearningCollaboratorPolicyModule { }
