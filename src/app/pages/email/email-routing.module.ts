import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemEmailComponent} from "./components/system-email/system-email.component";
import {SystemEmailListComponent} from "./components/system-email-list/system-email-list.component";
import {NotificationsEmailComponent} from "./components/notifications-email/notifications-email.component";
import {NotificationsEmailListComponent} from "./components/notifications-email-list/notifications-email-list.component";
import {EditEmailComponent} from "./components/edit-email/edit-email.component";


const routes: Routes = [
  {
    path:'system-email',
    component: SystemEmailComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path:'list',
        component: SystemEmailListComponent
      },
      {
        path:':id',
        data: {type: 'system', isCreate: false},
        component: EditEmailComponent
      },
    ]
  },
  {
    path:'notifications-email',
    component: NotificationsEmailComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path:'list',
        component: NotificationsEmailListComponent
      },
      {
        path:'create',
        data: {type: 'notifications', isCreate: true},
        component: EditEmailComponent
      },
      {
        path:':id',
        data: {type: 'notifications', isCreate: false},
        component: EditEmailComponent
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmailRoutingModule {}
