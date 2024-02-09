import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingStudentComponent } from './components/waiting-student/waiting-student.component';
import {StudentRoutingModule} from "./student-routing.module";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    WaitingStudentComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzGridModule,
    NzDropDownModule,
    NzIconModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
