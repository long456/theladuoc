import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsListComponent} from "./components/news-list/news-list.component";
import {CreateNewsComponent} from "./components/create-news/create-news.component";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsListComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateNewsComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateNewsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsRoutingModule {}
