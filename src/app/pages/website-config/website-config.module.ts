import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './components/config/config.component';
import { ListConfigComponent } from './components/list-config/list-config.component';
import {WebsiteConfigRoutingModule} from "./website-config-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditConfigComponent } from './components/edit-config/edit-config.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [
    ConfigComponent,
    ListConfigComponent,
    EditConfigComponent
  ],
  imports: [
    CommonModule,
    WebsiteConfigRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
  ]
})
export class WebsiteConfigModule { }
