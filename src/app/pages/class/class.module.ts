import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './components/class/class.component';
import { CreateClassComponent } from './components/create-class/create-class.component';
import {ClassRoutingModule} from "./class-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzListModule } from 'ng-zorro-antd/list';
import {NzSelectModule} from "ng-zorro-antd/select";
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";

@NgModule({
  declarations: [
    ClassComponent,
    CreateClassComponent,
    CreateLessonComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule
  ]
})
export class ClassModule { }
