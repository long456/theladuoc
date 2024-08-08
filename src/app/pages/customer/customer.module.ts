import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {CustomerRoutingModule} from "./customer-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import {OrderRouterOutletComponent} from "./components/ads-order/order-router-outlet/order-router-outlet.component";
import {OrderListComponent} from "./components/ads-order/order-list/order-list.component";
import {CreateOrderComponent} from "./components/ads-order/create-order/create-order.component";


@NgModule({
  declarations: [
    CustomerListComponent,
    CreateCustomerComponent,
    OrderRouterOutletComponent,
    OrderListComponent,
    CreateOrderComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
