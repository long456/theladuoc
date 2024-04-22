import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageRoutingModule} from "./landing-page-routing.module";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateLandingPageComponent } from './components/create-landing-page/create-landing-page.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {CKEditorModule} from "ckeditor4-angular";
import { AttachClassComponent } from './components/attach-class/attach-class.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    CreateLandingPageComponent,
    AttachClassComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzSelectModule,
    NzCollapseModule,
    CKEditorModule
  ]
})
export class LandingPageModule { }
