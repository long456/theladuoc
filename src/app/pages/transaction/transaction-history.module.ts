import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionHistoryRoutingModule } from './transaction-history-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DialogFilterTransactionComponent } from './dialog-filter-transaction/dialog-filter-transaction.component';


@NgModule({
  declarations: [
    TransactionHistoryComponent,
    DialogFilterTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionHistoryRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzSelectModule,
    NzCollapseModule,
    CKEditorModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzDatePickerModule,
    NzToolTipModule
  ]
})
export class TransactionHistoryModule { }
