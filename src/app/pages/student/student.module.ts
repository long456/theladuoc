import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingStudentComponent } from './components/waiting-student/waiting-student.component';
import {StudentRoutingModule} from "./student-routing.module";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {SharedModule} from "../../shared/shared.module";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TakingCareStudentComponent } from './components/taking-care-student/taking-care-student.component';
import { StudyingStudentComponent } from './components/studying-student/studying-student.component';
import { NonDividedStudentComponent } from './components/non-divided-student/non-divided-student.component';
import { DetailStudentComponent } from './components/detail-student/detail-student.component';
import { PaymentCheckComponent } from './components/payment-check/payment-check.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  declarations: [
    WaitingStudentComponent,
    TakingCareStudentComponent,
    StudyingStudentComponent,
    NonDividedStudentComponent,
    DetailStudentComponent,
    PaymentCheckComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzGridModule,
    NzDropDownModule,
    NzIconModule,
    StudentRoutingModule,
    NzTagModule,
    NzCollapseModule,
    SharedModule,
    NzSelectModule,
    NzInputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzDrawerModule
  ]
})
export class StudentModule { }
