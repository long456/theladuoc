import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentAuthRoutingModule} from "./payment-auth-routing.module";
import { PaymentAuthComponent } from './components/payment-auth/payment-auth.component';
import {SharedModule} from "../../shared/shared.module";
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzCollapseModule} from "ng-zorro-antd/collapse";


@NgModule({
  declarations: [
    PaymentAuthComponent
  ],
  imports: [
    CommonModule,
    PaymentAuthRoutingModule,
    SharedModule,
    NzImageModule,
    NzCollapseModule
  ]
})
export class PaymentAuthModule { }
