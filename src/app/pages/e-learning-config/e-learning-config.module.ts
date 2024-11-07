import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ELearningConfigRoutingModule } from "./e-learning-config-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { IntroVideoListComponent } from './components/introductory-video/intro-video-list/intro-video-list.component';
import { IntroVideoDetailComponent } from './components/introductory-video/intro-video-detail/intro-video-detail.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { GeneralConfigComponent } from './components/general-config/general-config.component';
import { HomePageConfigComponent } from './components/home-page-config/home-page-config.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  declarations: [
    IntroVideoListComponent,
    IntroVideoDetailComponent,
    ConfigListComponent,
    GeneralConfigComponent,
    HomePageConfigComponent
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
