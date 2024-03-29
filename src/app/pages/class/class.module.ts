import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './components/class/class.component';
import { CreateClassComponent } from './components/create-class/create-class.component';
import {ClassRoutingModule} from "./class-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzListModule } from 'ng-zorro-antd/list';


@NgModule({
  declarations: [
    ClassComponent,
    CreateClassComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule
  ]
})
export class ClassModule { }
