import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {ChapterRouterOutletComponent} from "./components/chapter/chapter-router-outlet/chapter-router-outlet.component";
import {ChapterListComponent} from "./components/chapter/chapter-list/chapter-list.component";

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
    path: 'chapter',
    component: ChapterRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:':courseId/list',
        component: ChapterListComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCourseRoutingModule {}
