import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IntroVideoListComponent} from "./components/introductory-video/intro-video-list/intro-video-list.component";
import {IntroVideoDetailComponent} from "./components/introductory-video/intro-video-detail/intro-video-detail.component";



const routes: Routes = [
  {
    path: 'intro-video',
    children: [
      {
        path: 'list',
        component: IntroVideoListComponent,
      },
      {
        path: ':id',
        component: IntroVideoDetailComponent,
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningConfigRoutingModule {}
