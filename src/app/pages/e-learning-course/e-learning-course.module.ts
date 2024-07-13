import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ELearningCourseRoutingModule} from "./e-learning-course-routing.module";
import { ChapterListComponent } from './components/chapter/chapter-list/chapter-list.component';
import { ChapterRouterOutletComponent } from './components/chapter/chapter-router-outlet/chapter-router-outlet.component';
import { CreateECourseComponent } from './components/create-e-course/create-e-course.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {CKEditorModule} from "ckeditor4-angular";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CreateChapterComponent } from './components/chapter/create-chapter/create-chapter.component';
import { VideoListComponent } from './components/video/video-list/video-list.component';
import { VideoRouterOutletComponent } from './components/video/video-router-outlet/video-router-outlet.component';
import { CreateVideoComponent } from './components/video/create-video/create-video.component';


@NgModule({
  declarations: [
    CourseListComponent,
    ChapterListComponent,
    ChapterRouterOutletComponent,
    CreateECourseComponent,
    CreateChapterComponent,
    VideoListComponent,
    VideoRouterOutletComponent,
    CreateVideoComponent,
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
