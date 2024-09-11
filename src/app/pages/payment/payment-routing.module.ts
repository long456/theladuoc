import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentAuthComponent} from "./components/payment-auth/payment-auth.component";
import {PaymentRefundComponent} from "./components/payment-refund/payment-refund.component";
import {PaymentMethodListComponent} from "./components/payment-method/payment-method-list/payment-method-list.component";
import {PaymentMethodCreateComponent} from "./components/payment-method/payment-method-create/payment-method-create.component";
import {WithdrawRequestComponent} from "./components/withdraw-request/withdraw-request.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: PaymentAuthComponent,
  },
  {
    path: 'refund',
    component: PaymentRefundComponent,
  },
  {
    path: 'withdraw',
    component: WithdrawRequestComponent,
  },
  {
    path:'method',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: PaymentMethodListComponent
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: PaymentMethodCreateComponent
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: PaymentMethodCreateComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule {}
