import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LessonRoutingModule} from "./lesson-routing.module";
import { LessonComponent } from './components/lesson/lesson.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { AttachZoomLinkComponent } from './components/attach-zoom-link/attach-zoom-link.component';



@NgModule({
  declarations: [
    LessonComponent,
    AttachZoomLinkComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzDropDownModule
  ]
})
export class LessonModule { }
