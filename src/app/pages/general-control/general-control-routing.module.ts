import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserControlComponent} from "./components/user-control/user-control.component";
import {InfoControlComponent} from "./components/info-control/info-control.component";
import {FinancialControlComponent} from "./components/financial-control/financial-control.component";
import {LearningProcessComponent} from "./components/learning-process/learning-process.component";
import {ReferralAccountComponent} from "./components/referral-account/referral-account.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-control'
  },
  {
    path: 'user-control',
    component: UserControlComponent,
    children: [
      {
        path: 'info',
        component: InfoControlComponent,
      },
      {
        path: 'financial',
        component: FinancialControlComponent,
      },
      {
        path: 'learning',
        component: LearningProcessComponent,
      },
      {
        path: 'referral',
        component: ReferralAccountComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GeneralControlRoutingModule {}
