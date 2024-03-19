import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageRoutingModule} from "./landing-page-routing.module";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateLandingPageComponent } from './components/create-landing-page/create-landing-page.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LandingPageComponent,
    CreateLandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LandingPageModule { }
