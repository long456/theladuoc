import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from "./components/course-list/course-list.component";
import { CreateECourseComponent } from './components/create-e-course/create-e-course.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCourseRoutingModule {}
