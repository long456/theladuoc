import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzLayoutModule } from "ng-zorro-antd/layout";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SpinComponent } from './components/spin/spin.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HeaderComponent } from './layouts/header/header.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TreeComponent } from './components/tree/tree.component';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FilesManagerComponent } from './components/files-manager/files-manager.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CardImageComponent } from './components/card-image/card-image.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ScrollNearBottomDirective } from './directives/table/scroll-near-bottom.directive';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SideBarComponent,
    MenuItemComponent,
    TableComponent,
    CellDirective,
    ColumnDirective,
    HeaderDirective,
    FilterFormComponent,
    SpinComponent,
    HeaderComponent,
    TreeComponent,
    FilesManagerComponent,
    CardImageComponent,
    ScrollNearBottomDirective,
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
    NzSpinModule,
    NzDropDownModule,
    NzDividerModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzToolTipModule,
    NzTreeViewModule,
    NzAvatarModule,
    NzTabsModule,
    FormsModule,
    NzCardModule,
    NzEmptyModule,
    NzPaginationModule,
    TranslateModule,

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
    NzToolTipModule,
    HeaderComponent,
    TreeComponent,
    NzTableModule,
    NzPaginationModule,
    NzDatePickerModule,
    TranslateModule
  ]
})
export class SharedModule { }
