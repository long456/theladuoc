import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    SideBarComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule
  ],
  exports: [
    SideBarComponent,
  ]
})
export class SharedModule { }
