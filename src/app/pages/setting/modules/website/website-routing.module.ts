import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLayoutsComponent} from "./components/list-layouts/list-layouts.component";
import {EditLayoutsComponent} from "./components/edit-layouts/edit-layouts.component";
import {LayoutsComponent} from "./components/layouts/layouts.component";

const routes: Routes = [
  {
    path:'list-layouts',
    component: LayoutsComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ListLayoutsComponent
      },
      {
        path: ':id',
        component: EditLayoutsComponent
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WebsiteRoutingModule {}
