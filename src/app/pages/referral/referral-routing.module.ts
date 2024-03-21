import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoyaltyComponent} from "./components/loyalty/loyalty.component";
import {LoyaltyListComponent} from "./components/loyalty-list/loyalty-list.component";

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReferralRoutingModule {}
