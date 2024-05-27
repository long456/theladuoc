import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffRoutingModule} from "./staff-routing.module";
import { StaffComponent } from './components/staff/staff.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [
    StaffComponent,
    CreateStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzCollapseModule,
    NzSelectModule,
    NzSwitchModule,
    NzPopoverModule,
  ]
})
export class StaffModule { }
