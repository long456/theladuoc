import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './components/organization/organization.component';
import {OrganizationRoutingModule} from "./organization-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { PermissionOrganizationComponent } from './components/permission-organization/permission-organization.component';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    OrganizationComponent,
    CreateOrganizationComponent,
    PermissionOrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzCheckboxModule,
    NzSelectModule
  ]
})
export class OrganizationModule { }