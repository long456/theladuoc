import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ELearningCourseRoutingModule} from "./e-learning-course-routing.module";
import { ChapterListComponent } from './components/chapter/chapter-list/chapter-list.component';
import { ChapterRouterOutletComponent } from './components/chapter/chapter-router-outlet/chapter-router-outlet.component';



@NgModule({
  declarations: [
    CourseListComponent,
    ChapterListComponent,
    ChapterRouterOutletComponent
  ],
  imports: [
    CommonModule,
    ELearningCourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ELearningCourseModule { }
