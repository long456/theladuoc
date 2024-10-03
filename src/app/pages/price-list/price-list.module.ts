import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PriceListRoutingModule} from "./price-list-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogDetailComponent } from './components/catalog/catalog-detail/catalog-detail.component';



@NgModule({
  declarations: [
    CatalogListComponent,
    CatalogDetailComponent
  ],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PriceListModule { }
