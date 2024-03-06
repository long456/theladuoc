import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebsiteRoutingModule} from "./website-routing.module";
import { ListLayoutsComponent } from './components/list-layouts/list-layouts.component';
import {SharedModule} from "../../../../shared/shared.module";
import { EditLayoutsComponent } from './components/edit-layouts/edit-layouts.component';
import { LayoutsComponent } from './components/layouts/layouts.component';



@NgModule({
  declarations: [
    ListLayoutsComponent,
    EditLayoutsComponent,
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule
  ]
})
export class WebsiteModule { }
