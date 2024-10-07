import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogListComponent} from "./components/catalog/catalog-list/catalog-list.component";
import {CatalogDetailComponent} from "./components/catalog/catalog-detail/catalog-detail.component";
import {PriceListComponent} from "./components/price/price-list/price-list.component";
import {PriceDetailComponent} from "./components/price/price-detail/price-detail.component";


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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PriceListRoutingModule {}
