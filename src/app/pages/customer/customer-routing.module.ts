import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from "./components/customer-list/customer-list.component";
import {CreateCustomerComponent} from "./components/create-customer/create-customer.component";
import {OrderRouterOutletComponent} from "./components/ads-order/order-router-outlet/order-router-outlet.component";
import {OrderListComponent} from "./components/ads-order/order-list/order-list.component";
import {CreateOrderComponent} from "./components/ads-order/create-order/create-order.component";


const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'ads',
    component: OrderRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: OrderListComponent
      },
      {
        path: ':id',
        component: CreateOrderComponent
      }
    ]
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateCustomerComponent
  },
  {
    path: ':code',
    data: {isCreate: false},
    component: CreateCustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule {}
