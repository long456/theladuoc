import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ELearningConfigRoutingModule} from "./e-learning-config-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { IntroVideoListComponent } from './components/introductory-video/intro-video-list/intro-video-list.component';
import { IntroVideoDetailComponent } from './components/introductory-video/intro-video-detail/intro-video-detail.component';



@NgModule({
  declarations: [
    IntroVideoListComponent,
    IntroVideoDetailComponent
  ],
  imports: [
    CommonModule,
    ELearningConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ELearningConfigModule { }
