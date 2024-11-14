import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigListComponent } from './components/config-list/config-list.component';
import {HomePageConfigComponent} from "./components/home-page-config/home-page-config.component";
import {GeneralConfigComponent} from "./components/general-config/general-config.component";
import {AboutUsConfigComponent} from "./components/about-us-config/about-us-config.component";


const routes: Routes = [
  {
    path: 'list',
    component: ConfigListComponent
  },
  {
    path: 'general',
    component: GeneralConfigComponent
  },
  {
    path: 'home-page',
    component: HomePageConfigComponent
  },
  {
    path: 'about-us',
    component: AboutUsConfigComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ELearningConfigRoutingModule { }
