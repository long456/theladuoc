import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketComponent} from "./components/ticket/ticket.component";
import {CreateTicketComponent} from "./components/create-ticket/create-ticket.component";


const routes: Routes = [
  {
    path:'',
    component: TicketComponent
  },
  {
    path:'create',
    data: {
      isCreate: true
    },
    component: CreateTicketComponent
  },
  {
    path:':id',
    data: {
      isCreate: false
    },
    component: CreateTicketComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TicketRoutingModule {}
