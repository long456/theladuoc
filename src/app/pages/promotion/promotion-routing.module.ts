import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CouponComponent} from "./components/coupons/coupon/coupon.component";
import {CreateCouponComponent} from "./components/coupons/create-coupon/create-coupon.component";

const routes: Routes = [
  {
    path: 'coupon',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CouponComponent
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: CreateCouponComponent
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: CreateCouponComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PromotionRoutingModule {}
