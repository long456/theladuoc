import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationComponent} from "./components/organization/organization.component";
import {CreateOrganizationComponent} from "./components/create-organization/create-organization.component";
import {PermissionOrganizationComponent} from "./components/permission-organization/permission-organization.component";
import {WithdrawConfigComponent} from "./components/withdraw-config/withdraw-config.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent
  },
  {
    path: 'withdraw-config',
    component: WithdrawConfigComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateOrganizationComponent
  },
  {
    path: 'permission/:id',
    data: {permission: true},
    component: PermissionOrganizationComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateOrganizationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizationRoutingModule {}
