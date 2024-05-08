import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoyaltyComponent} from "./components/loyalty/loyalty.component";
import {LoyaltyListComponent} from "./components/loyalty-list/loyalty-list.component";
import {CreateLoyaltyComponent} from "./components/create-loyalty/create-loyalty.component";

const routes: Routes = [
  {
    path:'loyalty',
    component: LoyaltyComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path:'list',
        component: LoyaltyListComponent
      },
      {
        path:'create',
        data: {isCreate: true},
        component: CreateLoyaltyComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReferralRoutingModule {}
