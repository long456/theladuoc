import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from "./components/customer-list/customer-list.component";
import {CreateCustomerComponent} from "./components/create-customer/create-customer.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
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
