import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsCategoryListComponent} from "./components/news-category-list/news-category-list.component";
import {CreateNewsCategoryComponent} from "./components/create-news-category/create-news-category.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsCategoryListComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateNewsCategoryComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateNewsCategoryComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsCategoryRoutingModule {}
