import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PriceListRoutingModule} from "./price-list-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogDetailComponent } from './components/catalog/catalog-detail/catalog-detail.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { PriceListComponent } from './components/price/price-list/price-list.component';
import { PriceDetailComponent } from './components/price/price-detail/price-detail.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";



@NgModule({
  declarations: [
    CatalogListComponent,
    CatalogDetailComponent,
    PriceListComponent,
    PriceDetailComponent
  ],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NzSwitchModule,
    NzSelectModule,
    NzInputNumberModule
  ]
})
export class PriceListModule { }
