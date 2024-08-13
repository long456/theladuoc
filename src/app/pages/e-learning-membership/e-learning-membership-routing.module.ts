import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MembershipListComponent} from "./components/membership-list/membership-list.component";
import {CreateMembershipComponent} from "./components/create-membership/create-membership.component";
import {RequestUpgradeComponent} from "./components/request-upgrade/request-upgrade.component";
import {ConfigRouterOutletComponent} from "./components/config/config-router-outlet/config-router-outlet.component";
import {MembershipConfigComponent} from "./components/config/membership-config/membership-config.component";
import {ConfigDetailComponent} from "./components/config/config-detail/config-detail.component";
import {OptionalCoursesComponent} from "./components/optional-courses/optional-courses.component";



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
        path: 'edit',
        component: ConfigDetailComponent
      }
    ]
  },
  {
    path:'optional-courses',
    children: [
      {
        path:':id',
        component: OptionalCoursesComponent,
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ELearningMembershipRoutingModule {}
