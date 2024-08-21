import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryListComponent } from './components/news-category-list/news-category-list.component';
import { CreateNewsCategoryComponent } from './components/create-news-category/create-news-category.component';
import {NewsCategoryRoutingModule} from "./news-category-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";



@NgModule({
  declarations: [
    NewsCategoryListComponent,
    CreateNewsCategoryComponent,
  ],
  imports: [
    CommonModule,
    NewsCategoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule
  ]
})
export class NewsCategoryModule {}
