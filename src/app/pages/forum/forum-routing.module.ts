import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumConfigComponent} from "./components/config/forum-config/forum-config.component";
import {ForumConfigDetailComponent} from "./components/config/forum-config-detail/forum-config-detail.component";
import {ForumCategoryListComponent} from "./components/category/forum-category-list/forum-category-list.component";
import {
  ForumCategoryDetailComponent
} from "./components/category/forum-category-detail/forum-category-detail.component";
import {SubForumListComponent} from "./components/sub-forum/sub-forum-list/sub-forum-list.component";
import {SubForumDetailComponent} from "./components/sub-forum/sub-forum-detail/sub-forum-detail.component";
import {NavigationListComponent} from "./components/navigation-forum/navigation-list/navigation-list.component";
import {NavigationDetailComponent} from "./components/navigation-forum/navigation-detail/navigation-detail.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'config'
  },
  {
    path: 'category',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ForumCategoryListComponent,
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: ForumCategoryDetailComponent
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: ForumCategoryDetailComponent
      },
    ]
  },
  {
    path: 'sub-forum',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: SubForumListComponent,
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: SubForumDetailComponent
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: SubForumDetailComponent
      },
    ]
  },
  {
    path: 'nav-forum',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: NavigationListComponent,
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: NavigationDetailComponent
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: NavigationDetailComponent
      },
    ]
  },
  {
    path: 'config',
    component: ForumConfigComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: ForumConfigDetailComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: ForumConfigDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ForumRoutingModule {}
