import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailAccountComponent} from "./components/email-account/email-account.component";
import {CreateEmailAccountComponent} from "./components/create-email-account/create-email-account.component";

const routes: Routes = [
  {
    path:'',
    component: EmailAccountComponent,
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateEmailAccountComponent,
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateEmailAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmailSmtpRoutingModule {}
