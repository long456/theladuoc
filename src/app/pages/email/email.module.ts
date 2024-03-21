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

@NgModule({
  declarations: [
    SystemEmailComponent,
    SystemEmailListComponent,
    NotificationsEmailComponent,
    NotificationsEmailListComponent,
    EditEmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class EmailModule { }
