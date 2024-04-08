import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffRoutingModule} from "./staff-routing.module";
import { StaffComponent } from './components/staff/staff.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCollapseModule} from "ng-zorro-antd/collapse";



@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzCollapseModule
  ]
})
export class StaffModule { }
