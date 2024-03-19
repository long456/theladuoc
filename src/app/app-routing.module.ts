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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
