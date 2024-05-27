import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyComponent } from './components/loyalty/loyalty.component';
import { LoyaltyListComponent } from './components/loyalty-list/loyalty-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ReferralRoutingModule} from "./referral-routing.module";
import { CreateLoyaltyComponent } from './components/create-loyalty/create-loyalty.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListComponent,
    CreateLoyaltyComponent
  ],
  imports: [
    CommonModule,
    ReferralRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzSwitchModule,
    NzDatePickerModule
  ]
})
export class ReferralModule { }
