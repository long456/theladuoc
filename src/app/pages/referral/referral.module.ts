import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyComponent } from './components/loyalty/loyalty.component';
import { LoyaltyListComponent } from './components/loyalty-list/loyalty-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ReferralRoutingModule} from "./referral-routing.module";

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListComponent
  ],
  imports: [
    CommonModule,
    ReferralRoutingModule,
    SharedModule
  ]
})
export class ReferralModule { }
