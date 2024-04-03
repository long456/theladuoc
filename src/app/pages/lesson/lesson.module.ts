import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LessonRoutingModule} from "./lesson-routing.module";
import { LessonComponent } from './components/lesson/lesson.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LessonComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LessonModule { }
