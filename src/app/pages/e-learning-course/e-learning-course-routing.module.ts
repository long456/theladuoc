import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {ChapterRouterOutletComponent} from "./components/chapter/chapter-router-outlet/chapter-router-outlet.component";
import {ChapterListComponent} from "./components/chapter/chapter-list/chapter-list.component";
import { CreateECourseComponent } from './components/create-e-course/create-e-course.component';
import {CreateChapterComponent} from "./components/chapter/create-chapter/create-chapter.component";
import {VideoRouterOutletComponent} from "./components/video/video-router-outlet/video-router-outlet.component";
import {VideoListComponent} from "./components/video/video-list/video-list.component";
import {CreateVideoComponent} from "./components/video/create-video/create-video.component";

const routes: Routes = [
  {
    path:'',
    redirectTo: 'e-course-list',
    pathMatch: "full",
  },
  {
    path: 'e-course-list',
    component: CourseListComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateECourseComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateECourseComponent
  },
  {
    path: 'chapter',
    component: ChapterRouterOutletComponent,
    children: [
      {
        path:':courseId/list',
        component: ChapterListComponent
      },
      {
        path:':courseId/create',
        data: {isCreate: true},
        component: CreateChapterComponent
      },
      {
        path:':courseId/:id',
        data: {isCreate: false},
        component: CreateChapterComponent
      }
    ],
  },
  {
    path: 'video',
    component: VideoRouterOutletComponent,
    children: [
      {
        path:':courseId/list',
        component: VideoListComponent
      },
      {
        path:':courseId/create',
        data: {isCreate: true},
        component: CreateVideoComponent
      },
      {
        path:':courseId/:id',
        data: {isCreate: false},
        component: CreateVideoComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCourseRoutingModule {}
