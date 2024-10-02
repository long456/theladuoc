import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NonDividedEStudentComponent} from "./components/non-divided-e-student/non-divided-e-student.component";
import {WaitingEStudentComponent} from "./components/waiting-e-student/waiting-e-student.component";
import {TakingCareEStudentComponent} from "./components/taking-care-e-student/taking-care-e-student.component";
import {StudyingEStudentComponent} from "./components/studying-e-student/studying-e-student.component";
import {RegisteringEStudentComponent} from "./components/registering-e-student/registering-e-student.component";
import {PermissionGuardService} from "../../shared/router-guard/permission-guard.service";
import {AgencyListComponent} from "./components/agency-list/agency-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'none-divide'
  },
  {
    path: 'none-divide',
    component: NonDividedEStudentComponent
  },
  {
    path: 'waiting',
    component: WaitingEStudentComponent
  },
  {
    path: 'take-care',
    component: TakingCareEStudentComponent,
    canActivate: [PermissionGuardService],
    data: { requiredPermission: 'student_care_list' }
  },
  {
    path: 'studying',
    component: StudyingEStudentComponent
  },
  {
    path: 'register',
    component: RegisteringEStudentComponent
  },
  {
    path: 'agency',
    component: AgencyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningStudentRoutingModule {}
