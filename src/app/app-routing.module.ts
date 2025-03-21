import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./layouts/page-layout/page/page.component";
import {AuthComponent} from "./layouts/auth-layout/auth/auth.component";
import {PromotionRoutingModule} from "./pages/promotion/promotion-routing.module";

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
      {
        path: 'e-learning-student',
        loadChildren: () => import('./pages/e-learning-student/e-learning-student.module').then(m => m.ELearningStudentModule),
      },
      {
        path: 'membership-policy',
        loadChildren: () => import('./pages/e-learning-membership/e-learning-membership.module').then(m => m.ELearningMembershipModule),
      },
      {
        path: 'transaction-history',
        loadChildren: () => import('./pages/transaction/transaction-history.module').then(m => m.TransactionHistoryModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'guests',
        loadChildren: () => import('./pages/guests/guests.module').then(m => m.GuestsModule),
      },
      {
        path: 'testimonials',
        loadChildren: () => import('./pages/testimonials/testimonials.module').then(m => m.TestimonialsModule),
      },
      {
        path: 'news-category',
        loadChildren: () => import('./pages/news-category/news-category.module').then(m => m.NewsCategoryModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule),
      },
      {
        path: 'event',
        loadChildren: () => import('./pages/event/event.module').then(m => m.EventModule),
      },
      {
        path: 'e-learning-config',
        loadChildren: () => import('./pages/e-learning-config/e-learning-config.module').then(m => m.ELearningConfigModule),
      },
      {
        path: 'forum',
        loadChildren: () => import('./pages/forum/forum.module').then(m => m.ForumModule),
      },
      {
        path: 'price-list',
        loadChildren: () => import('./pages/price-list/price-list.module').then(m => m.PriceListModule),
      },
      {
        path: 'general-control',
        loadChildren: () => import('./pages/general-control/general-control.module').then(m => m.GeneralControlModule),
      },
      {
        path: 'promotion',
        loadChildren: () => import('./pages/promotion/promotion.module').then(m => m.PromotionModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
