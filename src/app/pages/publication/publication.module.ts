import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublicationRoutingModule} from "./publication-routing.module";
import { PublicationComponent } from './components/publication/publication.component';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@NgModule({
  declarations: [
    PublicationComponent,
    CreatePublicationComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzUploadModule,
    NzSliderModule,
  ]
})
export class PublicationModule { }
