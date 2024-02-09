import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WaitingStudentComponent} from "./components/waiting-student/waiting-student.component";


const routes: Routes = [
  { path: '', component: WaitingStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule {}
