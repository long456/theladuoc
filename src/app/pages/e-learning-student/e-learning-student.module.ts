import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ELearningStudentRoutingModule} from "./e-learning-student-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { NonDividedEStudentComponent } from './components/non-divided-e-student/non-divided-e-student.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { StudyingEStudentComponent } from './components/studying-e-student/studying-e-student.component';
import { TakingCareEStudentComponent } from './components/taking-care-e-student/taking-care-e-student.component';
import { WaitingEStudentComponent } from './components/waiting-e-student/waiting-e-student.component';
import { RegisteringEStudentComponent } from './components/registering-e-student/registering-e-student.component';

@NgModule({
  declarations: [
    NonDividedEStudentComponent,
    StudyingEStudentComponent,
    TakingCareEStudentComponent,
    WaitingEStudentComponent,
    RegisteringEStudentComponent
  ],
  imports: [
    CommonModule,
    ELearningStudentRoutingModule,
    SharedModule,
    NzDropDownModule
  ]
})
export class ELearningStudentModule { }
