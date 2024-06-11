import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendanceRoutingModule} from "./attendance-routing.module";
import { AttendanceComponent } from './components/attendance/attendance.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AttendanceModule { }
