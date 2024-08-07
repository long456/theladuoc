import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MembershipListComponent} from "./components/membership-list/membership-list.component";
import {CreateMembershipComponent} from "./components/create-membership/create-membership.component";
import {RequestUpgradeComponent} from "./components/request-upgrade/request-upgrade.component";
import {ConfigRouterOutletComponent} from "./components/config/config-router-outlet/config-router-outlet.component";
import {MembershipConfigComponent} from "./components/config/membership-config/membership-config.component";
import {ConfigDetailComponent} from "./components/config/config-detail/config-detail.component";



const routes: Routes = [
  {
    path: '',
    component: MembershipListComponent
  },
  {
    path: 'request-upgrade',
    component: RequestUpgradeComponent
  },
  {
    path: 'config',
    component: ConfigRouterOutletComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: MembershipConfigComponent
      },
      {
        path: ':id',
        component: ConfigDetailComponent
      }
    ]
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateMembershipComponent,
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateMembershipComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningMembershipRoutingModule {}
