import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PromotionRoutingModule} from "./promotion-routing.module";
import { CouponComponent } from './components/coupons/coupon/coupon.component';
import { CreateCouponComponent } from './components/coupons/create-coupon/create-coupon.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSelectModule} from "ng-zorro-antd/select";



@NgModule({
  declarations: [
    CouponComponent,
    CreateCouponComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PromotionRoutingModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzSelectModule
  ]
})
export class PromotionModule { }
