import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventListComponent
  },
  {
    path: 'create',
    data: {isCreate: true},
    component: CreateEventComponent
  },
  {
    path: ':id',
    data: {isCreate: false},
    component: CreateEventComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventRoutingModule {}
