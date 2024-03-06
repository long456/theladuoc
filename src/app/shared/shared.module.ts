import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TableComponent } from './components/table/table.component';
import { CellDirective } from './directives/table/cell.directive';
import { ColumnDirective } from './directives/table/column.directive';
import { HeaderDirective } from './directives/table/header.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {ReactiveFormsModule} from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SpinComponent } from './components/spin/spin.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    SideBarComponent,
    MenuItemComponent,
    TableComponent,
    CellDirective,
    ColumnDirective,
    HeaderDirective,
    FilterFormComponent,
    SpinComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzMessageModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSpinModule
  ],
  exports: [
    SideBarComponent,
    TableComponent,
    ColumnDirective,
    CellDirective,
    HeaderDirective,
    FilterFormComponent,
    NzSpinModule,
    SpinComponent,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzModalModule,
    NzToolTipModule
  ]
})
export class SharedModule { }
