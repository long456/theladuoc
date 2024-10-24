import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogListComponent} from "./components/catalog/catalog-list/catalog-list.component";
import {CatalogDetailComponent} from "./components/catalog/catalog-detail/catalog-detail.component";
import {PriceListComponent} from "./components/price/price-list/price-list.component";
import {PriceDetailComponent} from "./components/price/price-detail/price-detail.component";
import {BenefitListComponent} from "./components/benefit-group/benefit-list/benefit-list.component";
import {BenefitDetailComponent} from "./components/benefit-group/benefit-detail/benefit-detail.component";
import {BenefitConfigComponent} from "./components/catalog/benefit-config/benefit-config.component";
import {
  BusinessAccessListComponent
} from "./components/business-access/business-access-list/business-access-list.component";
import {
  BusinessAccessDetailComponent
} from "./components/business-access/business-access-detail/business-access-detail.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalog'
  },
  {
    path: 'catalog',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CatalogListComponent
      },
      {
        path: 'benefit-config',
        children: [
          {
            path: ':id',
            component: BenefitConfigComponent
          }
        ]
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: CatalogDetailComponent,
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: CatalogDetailComponent,
      }
    ]
  },
  {
    path: 'price',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: PriceListComponent,
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: PriceDetailComponent,
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: PriceDetailComponent,
      }
    ]
  },
  {
    path: 'business-access',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: BusinessAccessListComponent,
      },
      {
        path: 'create',
        data: {isCreate: true},
        component: BusinessAccessDetailComponent,
      },
      {
        path: ':id',
        data: {isCreate: false},
        component: BusinessAccessDetailComponent,
      }
    ]
  }
  // {
  //   path: 'benefit-group',
  //   children: [
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       redirectTo: 'list'
  //     },
  //     {
  //       path: 'list',
  //       component: BenefitListComponent,
  //     },
  //     {
  //       path: 'create',
  //       data: {isCreate: true},
  //       component: BenefitDetailComponent,
  //     },
  //     {
  //       path: ':id',
  //       data: {isCreate: false},
  //       component: BenefitDetailComponent,
  //     }
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PriceListRoutingModule {}
