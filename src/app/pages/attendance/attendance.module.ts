import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendanceRoutingModule} from "./attendance-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListLessonComponent } from './components/list-lesson/list-lesson.component';
import { ListAttendanceComponent } from './components/list-attendance/list-attendance.component';



@NgModule({
  declarations: [
    ListLessonComponent,
    ListAttendanceComponent
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
