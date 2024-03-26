import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from "./components/config/config.component";
import {ListConfigComponent} from "./components/list-config/list-config.component";
import {EditConfigComponent} from "./components/edit-config/edit-config.component";


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WebsiteConfigRoutingModule {}
