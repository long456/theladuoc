import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./layouts/page-layout/page/page.component";
import {AuthComponent} from "./layouts/auth-layout/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'page',
    component: PageComponent,
    children: [
      {
        path: 'student',
        loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: 'organization',
        loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent),
      },
      {
        path: 'staff',
        loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule),
      },
      {
        path: 'payment',
        loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule),
      },
      {
        path: 'attendance',
        loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule),
      },
      {
        path: 'e-category',
        loadChildren: () => import('./pages/e-learning-category/e-learning-category.module').then(m => m.ELearningCategoryModule),
      },
      {
        path: 'e-course',
        loadChildren: () => import('./pages/e-learning-course/e-learning-course.module').then(m => m.ELearningCourseModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./pages/report/reporting.module').then(m => m.ReportingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
