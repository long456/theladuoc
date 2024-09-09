import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import {NewsRoutingModule} from "./news-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzSelectModule } from 'ng-zorro-antd/select';
import {CKEditorModule} from "ckeditor4-angular";


@NgModule({
  declarations: [
    NewsListComponent,
    CreateNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzSelectModule,
    CKEditorModule,
  ]
})
export class NewsModule { }
