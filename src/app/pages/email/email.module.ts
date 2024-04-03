import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailRoutingModule} from "./email-routing.module";
import { SystemEmailComponent } from './components/system-email/system-email.component';
import { SystemEmailListComponent } from './components/system-email-list/system-email-list.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NotificationsEmailComponent } from './components/notifications-email/notifications-email.component';
import { NotificationsEmailListComponent } from './components/notifications-email-list/notifications-email-list.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import {CKEditorModule} from "ckeditor4-angular";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import {NzSelectModule} from "ng-zorro-antd/select";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CreateNotificationsEmailComponent } from './components/create-notifications-email/create-notifications-email.component';

@NgModule({
  declarations: [
    SystemEmailComponent,
    SystemEmailListComponent,
    NotificationsEmailComponent,
    NotificationsEmailListComponent,
    EditEmailComponent,
    CreateNotificationsEmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzInputNumberModule
  ]
})
export class EmailModule { }
