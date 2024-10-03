import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogListComponent} from "./components/catalog/catalog-list/catalog-list.component";
import {CatalogDetailComponent} from "./components/catalog/catalog-detail/catalog-detail.component";


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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PriceListRoutingModule {}
