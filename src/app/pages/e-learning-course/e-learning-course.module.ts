import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ELearningCourseRoutingModule} from "./e-learning-course-routing.module";
import { CreateECourseComponent } from './components/create-e-course/create-e-course.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {CKEditorModule} from "ckeditor4-angular";
import { NzSwitchModule } from 'ng-zorro-antd/switch';


@NgModule({
  declarations: [
    CourseListComponent,
    CreateECourseComponent
  ],
  imports: [
    CommonModule,
    ELearningCourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NzInputNumberModule,
    NzSelectModule,
    CKEditorModule,
    NzSwitchModule
  ]
})
export class ELearningCourseModule { }
