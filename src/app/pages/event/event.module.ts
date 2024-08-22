import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './components/event-list/event-list.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import {EventRoutingModule} from "./event-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EventListComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EventModule { }
