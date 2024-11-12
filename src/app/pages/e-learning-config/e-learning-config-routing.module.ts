import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigListComponent } from './components/config-list/config-list.component';
import {HomePageConfigComponent} from "./components/home-page-config/home-page-config.component";
import {GeneralConfigComponent} from "./components/general-config/general-config.component";


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
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ELearningConfigRoutingModule { }
