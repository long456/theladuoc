import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketRoutingModule} from "./ticket-routing.module";
import { TicketComponent } from './components/ticket/ticket.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSelectModule} from "ng-zorro-antd/select";



@NgModule({
  declarations: [
    TicketComponent,
    CreateTicketComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzSelectModule
  ]
})
export class TicketModule { }
