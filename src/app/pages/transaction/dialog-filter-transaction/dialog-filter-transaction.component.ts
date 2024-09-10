import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { DateTimeHelper } from '../../report/helper/date-time-helper';
import { DataDropResponse } from '../../report/model/data-drop-response';
import { MemberPriceType, OrderPaymentStatus, PaymentMethod } from '../const/transaction-history.const';
import { TransactionHistoryService } from '../service/transaction-history.service';

@Component({
  selector: 'app-dialog-filter-transaction',
  templateUrl: './dialog-filter-transaction.component.html',
  styleUrls: ['./dialog-filter-transaction.component.scss']
})
export class DialogFilterTransactionComponent {

  lstMemberPriceType = MemberPriceType;
  lstOrderPaymentStatus = OrderPaymentStatus;
  lstPaymentMethod = PaymentMethod;

  dateFormat = 'dd/MM/yyyy';
  myForm = new FormGroup({
    customerIdCtrl: new FormControl(null),
    paymentMethodCtrl: new FormControl(null),
    priceMemberPolicyTypeCtrl: new FormControl(null),
    organizationIdCtrl: new FormControl(null),
    paymentStatusCtrl: new FormControl(null),
    startCtrl: new FormControl(null),
    endCtrl: new FormControl(null),
    dateTimeRangeCtrl: new FormControl([] as any),
  });
  ctrl = this.myForm.controls;
  dropModel: DataDropResponse = new DataDropResponse();
  constructor(@Inject(NZ_MODAL_DATA) public data: any,
    private modal: NzModalRef<DialogFilterTransactionComponent>,
    private dateTimeHelper: DateTimeHelper,
    private transactionHistoryService: TransactionHistoryService,
    private message: NzMessageService) {
    console.log(this.data);
    this.setFilter();
  }

  setFilter() {
    if (this.data.filter.customerId != null && this.data.filter.customerId != undefined) {
      this.ctrl.customerIdCtrl.setValue(this.data.filter.customerId);
    }
    if (this.data.filter.paymentMethod != null && this.data.filter.paymentMethod != undefined) {
      this.ctrl.paymentMethodCtrl.setValue(this.data.filter.paymentMethod);
    }
    if (this.data.filter.priceMemberPolicyType != null && this.data.filter.priceMemberPolicyType != undefined) {
      this.ctrl.priceMemberPolicyTypeCtrl.setValue(this.data.filter.priceMemberPolicyType);
    }
    if (this.data.filter.organizationId != null && this.data.filter.organizationId != undefined) {
      this.ctrl.organizationIdCtrl.setValue(this.data.filter.organizationId);
    }
    if (this.data.filter.paymentStatus != null && this.data.filter.paymentStatus != undefined) {
      this.ctrl.paymentStatusCtrl.setValue(this.data.filter.paymentStatus);
    }

    if (this.data.filter.start || this.data.filter.end) {
      let [dayStart, monthStart, yearStart] = this.data.filter.start.split('/');
      let [dayEnd, monthEnd, yearEnd] = this.data.filter.end.split('/');
      this.ctrl.dateTimeRangeCtrl.setValue([new Date(`${yearStart}-${monthStart}-${dayStart}`), new Date(`${yearEnd}-${monthEnd}-${dayEnd}`)]);
    }
  }

  ngOnInit(): void {
    this.transactionHistoryService.lstDropData().subscribe(x => {
      if (x.data) {
        this.dropModel = plainToClass(DataDropResponse, x.data);
      }
    });
  }

  resetForm() {
    this.modal.close(false);
  }

  onSave(isExportExcel: boolean = false) {
    let dataFilter: any = {
      ...this.getFilterDateTime()
    };
    if (this.ctrl.customerIdCtrl.value != null && this.ctrl.customerIdCtrl.value != undefined) {
      dataFilter.customerId = this.ctrl.customerIdCtrl.value;
    }
    if (this.ctrl.paymentMethodCtrl.value != null && this.ctrl.paymentMethodCtrl.value != undefined) {
      dataFilter.paymentMethod = this.ctrl.paymentMethodCtrl.value;
    }
    if (this.ctrl.priceMemberPolicyTypeCtrl.value != null && this.ctrl.priceMemberPolicyTypeCtrl.value != undefined) {
      dataFilter.priceMemberPolicyType = this.ctrl.priceMemberPolicyTypeCtrl.value;
    }
    if (this.ctrl.organizationIdCtrl.value != null && this.ctrl.organizationIdCtrl.value != undefined) {
      dataFilter.organizationId = this.ctrl.organizationIdCtrl.value;
    }

    if (this.ctrl.paymentStatusCtrl.value != null && this.ctrl.paymentStatusCtrl.value != undefined) {
      dataFilter.paymentStatus = this.ctrl.paymentStatusCtrl.value;
    }


    const isDataFilterEmpty = Object.values(dataFilter).every(value => value == null || value === '');
    if (isExportExcel && isDataFilterEmpty) {
      this.message.warning("Bạn cần phải chọn ít nhất 1 điều kiện lọc để có thể xuất file excel !")
      return;
    }

    this.modal.close({ dataFilter: dataFilter, isExportExcel: isExportExcel });
  }

  getFilterDateTime() {
    let result = {};

    if (this.ctrl.dateTimeRangeCtrl.value) {
      result = this.dateTimeHelper.getDateTimeByDay(this.ctrl.dateTimeRangeCtrl.value[0], this.ctrl.dateTimeRangeCtrl.value[1]);
    }

    return result;
  }
}
