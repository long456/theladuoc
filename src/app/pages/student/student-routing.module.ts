import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WaitingStudentComponent} from "./components/waiting-student/waiting-student.component";
import {TakingCareStudentComponent} from "./components/taking-care-student/taking-care-student.component";
import {StudyingStudentComponent} from "./components/studying-student/studying-student.component";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'waiting'
  },
  {
    path: 'waiting',
    component: WaitingStudentComponent
  },
  {
    path: 'take-care',
    component: TakingCareStudentComponent
  },
  {
    path: 'studying',
    component: StudyingStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule {}
