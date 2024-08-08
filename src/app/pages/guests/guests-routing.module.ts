import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestsListComponent} from "./components/guests-list/guests-list.component";



const routes: Routes = [
  {
    path: '',
    component: GuestsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GuestsRoutingModule {}
