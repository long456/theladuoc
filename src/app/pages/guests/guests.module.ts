import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestsRoutingModule} from "./guests-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GuestsListComponent } from './components/guests-list/guests-list.component';

@NgModule({
  declarations: [
    GuestsListComponent
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GuestsModule { }
