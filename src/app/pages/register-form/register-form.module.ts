import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {RegisterFormRoutingModule} from "./register-form-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { CreateFormComponent } from './components/create-form/create-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CKEditorModule } from 'ckeditor4-angular';
import {NzSelectModule} from "ng-zorro-antd/select";
import { AttachTicketComponent } from './components/attach-ticket/attach-ticket.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    CreateFormComponent,
    AttachTicketComponent,
  ],
  imports: [
    CommonModule,
    RegisterFormRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzCheckboxModule,
    CKEditorModule,
    NzSelectModule
  ]
})
export class RegisterFormModule { }
