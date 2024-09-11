import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAuthComponent } from './components/payment-auth/payment-auth.component';
import {SharedModule} from "../../shared/shared.module";
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {PaymentRoutingModule} from "./payment-routing.module";
import { PaymentRefundComponent } from './components/payment-refund/payment-refund.component';
import { PaymentMethodListComponent } from './components/payment-method/payment-method-list/payment-method-list.component';
import { PaymentMethodCreateComponent } from './components/payment-method/payment-method-create/payment-method-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { WithdrawRequestComponent } from './components/withdraw-request/withdraw-request.component';


@NgModule({
  declarations: [
    PaymentAuthComponent,
    PaymentRefundComponent,
    PaymentMethodListComponent,
    PaymentMethodCreateComponent,
    WithdrawRequestComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    NzImageModule,
    NzCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzSwitchModule,
  ]
})
export class PaymentModule { }
