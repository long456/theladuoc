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
    path: 'register-form',
    loadChildren: () => import('../register-form/register-form.module').then(m => m.RegisterFormModule),
  },
  {
    path: 'landing-page',
    loadChildren: () => import('../landing-page/landing-page.module').then(m => m.LandingPageModule),
  },
  {
    path: 'ticket',
    loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketModule),
  },
  {
    path: 'email-account',
    loadChildren: () => import('../email-smtp/email-smtp.module').then(m => m.EmailSmtpModule),
  },
  {
    path: 'email',
    loadChildren: () => import('../email/email.module').then(m => m.EmailModule),
  },
  {
    path: 'referral',
    loadChildren: () => import('../referral/referral.module').then(m => m.ReferralModule),
  },
  {
    path: 'website-config',
    loadChildren: () => import('../website-config/website-config.module').then(m => m.WebsiteConfigModule),
  },
  {
    path: 'class',
    loadChildren: () => import('../class/class.module').then(m => m.ClassModule),
  },
  {
    path: 'lesson',
    loadChildren: () => import('../lesson/lesson.module').then(m => m.LessonModule),
  },
  {
    path: 'publication',
    loadChildren: () => import('../publication/publication.module').then(m => m.PublicationModule),
  },
  {
    path: 'product',
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'warehouse',
    loadChildren: () => import('../warehouse/warehouse.module').then(m => m.WarehouseModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SetupRoutingModules {}
