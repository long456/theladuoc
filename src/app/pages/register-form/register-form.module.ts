import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {RegisterFormRoutingModule} from "./register-form-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { CreateFormComponent } from './components/create-form/create-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";

@NgModule({
  declarations: [
    RegisterFormComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    RegisterFormRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule
  ]
})
export class RegisterFormModule { }
