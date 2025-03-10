import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GeneralControlRoutingModule} from "./general-control-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { UserControlComponent } from './components/user-control/user-control.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import { InfoControlComponent } from './components/info-control/info-control.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzListModule} from "ng-zorro-antd/list";
import { FinancialControlComponent } from './components/financial-control/financial-control.component';
import { LearningProcessComponent } from './components/learning-process/learning-process.component';
import { ReferralAccountComponent } from './components/referral-account/referral-account.component';



@NgModule({
  declarations: [
    UserControlComponent,
    InfoControlComponent,
    FinancialControlComponent,
    LearningProcessComponent,
    ReferralAccountComponent
  ],
  imports: [
    CommonModule,
    GeneralControlRoutingModule,
    SharedModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzEmptyModule,
    NzTimePickerModule,
    NzTabsModule,
    NzAvatarModule,
    NzCardModule,
    NzListModule
  ]
})
export class GeneralControlModule { }
