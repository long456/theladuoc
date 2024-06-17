import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {CreateECategoryComponent} from "./components/create-e-category/create-e-category.component";

const routes: Routes = [
  {
    path: '',
    component:CategoryListComponent,
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateECategoryComponent,
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateECategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningCategoryRoutingModule {}
