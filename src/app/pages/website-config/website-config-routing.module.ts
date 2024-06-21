import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from "./components/configs/config/config.component";
import {ListConfigComponent} from "./components/configs/list-config/list-config.component";
import {EditConfigComponent} from "./components/configs/edit-config/edit-config.component";
import {HeaderRouterOutletComponent} from "./components/header-config/header-router-outlet/header-router-outlet.component";
import {ListHeaderComponent} from "./components/header-config/list-header/list-header.component";
import {FooterRouterOutletComponent} from "./components/footer-config/footer-router-outlet/footer-router-outlet.component";
import {ListFooterComponent} from "./components/footer-config/list-footer/list-footer.component";
import {EditFooterComponent} from "./components/footer-config/edit-footer/edit-footer.component";
import {PageRouterOutletComponent} from "./components/page-config/page-router-outlet/page-router-outlet.component";
import {ListPageComponent} from "./components/page-config/list-page/list-page.component";
import {EditPageComponent} from "./components/page-config/edit-page/edit-page.component";
import {EditHeaderComponent} from "./components/header-config/edit-header/edit-header.component";


const routes: Routes = [
  {
    path:'config',
    component: ConfigComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:'list',
        component: ListConfigComponent,
      },
      {
        path:':id',
        component: EditConfigComponent,
      },
    ]
  },
  {
    path:'header',
    component: HeaderRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:'list',
        component: ListHeaderComponent,
      },
      {
        path:'create',
        data: {isCreate: true},
        component: EditHeaderComponent,
      },
      {
        path:':id',
        data: {isCreate: false},
        component: EditHeaderComponent,
      },
    ]
  },
  {
    path:'footer',
    component: FooterRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:'list',
        component: ListFooterComponent,
      },
      {
        path:':id',
        component: EditFooterComponent,
      },
    ]
  },
  {
    path:'page-config',
    component: PageRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:'list',
        component: ListPageComponent,
      },
      {
        path:'create',
        data: {isCreate: true},
        component: EditPageComponent,
      },
      {
        path:':id',
        data: {isCreate: false},
        component: EditPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WebsiteConfigRoutingModule {}
