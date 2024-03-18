import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionComponent} from "./components/permissions/permission/permission.component";
import {CreatePermissionComponent} from "./components/permissions/create-permission/create-permission.component";
import {ListPermisionComponent} from "./components/permissions/list-permision/list-permision.component";
import {CourseComponent} from "./components/courses/course/course.component";
import {ListCourseComponent} from "./components/courses/list-course/list-course.component";
import {CreateCourseComponent} from "./components/courses/create-course/create-course.component";
import {AuthGuardService} from "../../shared/services/auth-guard.service";


const routes: Routes = [
  {
    path: 'permission',
    component: PermissionComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path:'list',
        data: {permission: 'role_list'},
        canActivate: [AuthGuardService],
        component: ListPermisionComponent
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: CreatePermissionComponent
      },
      {
        path:':id',
        data: {isCreate: false},
        component: CreatePermissionComponent
      }
    ]
  },
  {
    path: 'course',
    component: CourseComponent,
    children: [
      {
        path:'',
        pathMatch: "full",
        redirectTo: 'list'
      },
      {
        path:'list',
        component: ListCourseComponent
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: CreateCourseComponent
      },
      {
        path:':id',
        data: {isCreate: false},
        component: CreateCourseComponent
      }
    ]
  },
  {
    path: 'website',
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: 'register-form',
    loadChildren: () => import('../register-form/register-form.module').then(m => m.RegisterFormModule),
  },
  {
    path: 'ticket',
    loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketModule),
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SetupRoutingModules {}
