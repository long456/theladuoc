import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollaboratorPolicyComponent} from "./components/collaborator-policy/collaborator-policy.component";
import {CreateCollaboratorPolicyComponent} from "./components/create-collaborator-policy/create-collaborator-policy.component";

const routes: Routes = [
  {
    path: '',
    component: CollaboratorPolicyComponent
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateCollaboratorPolicyComponent,
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateCollaboratorPolicyComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCollaboratorPolicyRoutingModule {}
