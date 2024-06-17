import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentAuthComponent} from "./components/payment-auth/payment-auth.component";
import {PaymentRefundComponent} from "./components/payment-refund/payment-refund.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: PaymentAuthComponent,
  },
  {
    path: 'refund',
    component: PaymentRefundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule {}
