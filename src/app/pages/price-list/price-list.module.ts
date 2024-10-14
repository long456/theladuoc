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
import { BenefitListComponent } from './components/benefit-group/benefit-list/benefit-list.component';
import { BenefitDetailComponent } from './components/benefit-group/benefit-detail/benefit-detail.component';
import { BenefitConfigComponent } from './components/catalog/benefit-config/benefit-config.component';
import { BusinessAccessListComponent } from './components/business-access/business-access-list/business-access-list.component';
import { BusinessAccessDetailComponent } from './components/business-access/business-access-detail/business-access-detail.component';

@NgModule({
  declarations: [
    CatalogListComponent,
    CatalogDetailComponent,
    PriceListComponent,
    PriceDetailComponent,
    BenefitListComponent,
    BenefitDetailComponent,
    BenefitConfigComponent,
    BusinessAccessListComponent,
    BusinessAccessDetailComponent,
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
