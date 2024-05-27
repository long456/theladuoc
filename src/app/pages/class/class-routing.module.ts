import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassComponent} from "./components/class/class.component";
import {CreateClassComponent} from "./components/create-class/create-class.component";

const routes: Routes = [
  {
    path:'',
    pathMatch: "full",
    redirectTo: 'list'
  },
  {
    path:'list',
    component: ClassComponent
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateClassComponent
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateClassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClassRoutingModule {}
