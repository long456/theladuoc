import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MembershipListComponent} from "./components/membership-list/membership-list.component";
import {CreateMembershipComponent} from "./components/create-membership/create-membership.component";


const routes: Routes = [
  {
    path: '',
    component: MembershipListComponent
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
