import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentAuthComponent} from "./components/payment-auth/payment-auth.component";

const routes: Routes = [
  {
    path: '',
    component: PaymentAuthComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentAuthRoutingModule {}
