import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ELearningConfigRoutingModule } from "./e-learning-config-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ConfigListComponent } from './components/config-list/config-list.component';
import { GeneralConfigComponent } from './components/general-config/general-config.component';
import { HomePageConfigComponent } from './components/home-page-config/home-page-config.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { AboutUsConfigComponent } from './components/about-us-config/about-us-config.component';

@NgModule({
  declarations: [
    ConfigListComponent,
    GeneralConfigComponent,
    HomePageConfigComponent,
    AboutUsConfigComponent
  ],
    imports: [
        CommonModule,
        ELearningConfigRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NzDropDownModule,
        NzSelectModule,
        NzSwitchModule,
        NzInputNumberModule,
        NzDividerModule,
    ]
})
export class ELearningConfigModule { }
