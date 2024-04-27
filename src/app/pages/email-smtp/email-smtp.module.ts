import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailAccountComponent } from './components/email-account/email-account.component';
import { CreateEmailAccountComponent } from './components/create-email-account/create-email-account.component';
import {EmailSmtpRoutingModule} from "./email-smtp-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
  declarations: [
    EmailAccountComponent,
    CreateEmailAccountComponent
  ],
  imports: [
    CommonModule,
    EmailSmtpRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzSelectModule
  ]
})
export class EmailSmtpModule { }
