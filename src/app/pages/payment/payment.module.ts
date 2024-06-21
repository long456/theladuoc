import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAuthComponent } from './components/payment-auth/payment-auth.component';
import {SharedModule} from "../../shared/shared.module";
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {PaymentRoutingModule} from "./payment-routing.module";
import { PaymentRefundComponent } from './components/payment-refund/payment-refund.component';


@NgModule({
  declarations: [
    PaymentAuthComponent,
    PaymentRefundComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    NzImageModule,
    NzCollapseModule
  ]
})
export class PaymentModule { }
