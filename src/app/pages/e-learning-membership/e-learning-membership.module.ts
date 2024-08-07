import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipListComponent } from './components/membership-list/membership-list.component';
import {CreateMembershipComponent} from "./components/create-membership/create-membership.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ELearningMembershipRoutingModule} from "./e-learning-membership-routing.module";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { RequestUpgradeComponent } from './components/request-upgrade/request-upgrade.component';
import { MembershipConfigComponent } from './components/config/membership-config/membership-config.component';
import { ConfigRouterOutletComponent } from './components/config/config-router-outlet/config-router-outlet.component';
import { ConfigDetailComponent } from './components/config/config-detail/config-detail.component';




@NgModule({
  declarations: [
    MembershipListComponent,
    CreateMembershipComponent,
    RequestUpgradeComponent,
    MembershipConfigComponent,
    ConfigRouterOutletComponent,
    ConfigDetailComponent
  ],
  imports: [
    CommonModule,
    ELearningMembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzDividerModule
  ]
})
export class ELearningMembershipModule { }
