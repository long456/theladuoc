import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from "./components/course-list/course-list.component";

const routes: Routes = [
  {
    path:'',
    redirectTo: 'e-course-list',
    pathMatch: "full",
  },
  {
    path: 'e-course-list',
    component: CourseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCourseRoutingModule {}
