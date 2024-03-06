import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {CreateFormComponent} from "./components/create-form/create-form.component";

const routes: Routes = [
  {
    path:'',
    component: RegisterFormComponent
  },
  {
    path:'create',
    component: CreateFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFormRoutingModule {}
