import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroVideoListComponent } from "./components/introductory-video/intro-video-list/intro-video-list.component";
import { IntroVideoDetailComponent } from "./components/introductory-video/intro-video-detail/intro-video-detail.component";
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
  // {
  //   path: 'intro-video',
  //   children: [
  //     {
  //       path: 'list',
  //       component: IntroVideoListComponent,
  //     },
  //     {
  //       path: ':id',
  //       component: IntroVideoDetailComponent,
  //     }
  //   ]
  // },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ELearningConfigRoutingModule { }
