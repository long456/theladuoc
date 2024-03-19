import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {CreateLandingPageComponent} from "./components/create-landing-page/create-landing-page.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateLandingPageComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateLandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LandingPageRoutingModule{}
