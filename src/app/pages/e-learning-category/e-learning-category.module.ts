import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './components/category-list/category-list.component';
import {ELearningCategoryRoutingModule} from "./e-learning-category-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CreateECategoryComponent } from './components/create-e-category/create-e-category.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";



@NgModule({
  declarations: [
    CategoryListComponent,
    CreateECategoryComponent
  ],
  imports: [
    CommonModule,
    ELearningCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputNumberModule
  ]
})
export class ELearningCategoryModule { }
