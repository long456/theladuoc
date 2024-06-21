import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './components/configs/config/config.component';
import { ListConfigComponent } from './components/configs/list-config/list-config.component';
import {WebsiteConfigRoutingModule} from "./website-config-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditConfigComponent } from './components/configs/edit-config/edit-config.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { HeaderRouterOutletComponent } from './components/header-config/header-router-outlet/header-router-outlet.component';
import { ListHeaderComponent } from './components/header-config/list-header/list-header.component';
import { EditHeaderComponent } from './components/header-config/edit-header/edit-header.component';
import { FooterRouterOutletComponent } from './components/footer-config/footer-router-outlet/footer-router-outlet.component';
import { ListFooterComponent } from './components/footer-config/list-footer/list-footer.component';
import { EditFooterComponent } from './components/footer-config/edit-footer/edit-footer.component';
import { PageRouterOutletComponent } from './components/page-config/page-router-outlet/page-router-outlet.component';
import { ListPageComponent } from './components/page-config/list-page/list-page.component';
import { EditPageComponent } from './components/page-config/edit-page/edit-page.component';
import {CKEditorModule} from "ckeditor4-angular";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    ConfigComponent,
    ListConfigComponent,
    EditConfigComponent,
    HeaderRouterOutletComponent,
    ListHeaderComponent,
    EditHeaderComponent,
    FooterRouterOutletComponent,
    ListFooterComponent,
    EditFooterComponent,
    PageRouterOutletComponent,
    ListPageComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    WebsiteConfigRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    CKEditorModule,
    NzInputNumberModule,
    NzSelectModule,
  ]
})
export class WebsiteConfigModule { }
