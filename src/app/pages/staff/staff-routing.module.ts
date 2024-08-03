import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffComponent} from "./components/staff/staff.component";
import {CreateStaffComponent} from "./components/create-staff/create-staff.component";

const routes: Routes = [
  {
    path:'',
    component: StaffComponent
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateStaffComponent
  },
  {
    path:':code',
    data: {isCreate: false},
    component: CreateStaffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StaffRoutingModule {}
