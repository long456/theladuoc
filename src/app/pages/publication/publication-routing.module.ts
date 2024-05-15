import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicationComponent} from "./components/publication/publication.component";
import {CreatePublicationComponent} from "./components/create-publication/create-publication.component";

const routes: Routes = [
  {
    path: '',
    component: PublicationComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreatePublicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export  class PublicationRoutingModule {}
