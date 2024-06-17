import {Component, OnInit, TemplateRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PaymentRefundService} from "../../services/payment-refund.service";
import {NzImageService} from "ng-zorro-antd/image";
import {environment} from "../../../../../environments/environment";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-payment-refund',
  templateUrl: './payment-refund.component.html',
  styleUrls: ['./payment-refund.component.scss']
})
export class PaymentRefundComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;

  paymentRefund$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  isExpand = false;

  listOfColumn: filterItem[] = [];

  constructor(
    private router: Router,
    private message: NzMessageService,
    private paymentRefundService: PaymentRefundService,
    private nzImageService: NzImageService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.paymentRefund$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.paymentRefundService.getListRefund(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.paymentRefunds,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu yêu cầu hoàn tiền');
              return of({
                rows: [],
                page: 0,
                pageSize: 0,
                rowTotal: 0
              });
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  showImg(data: any) {
    const baseUrl = environment.baseImgUrl
    const img = [
      {
        src: baseUrl + data.receiptImage
      }
    ]
    this.nzImageService.preview(img, { nzZoom: 1, nzRotate: 0 });
  }

  verifyPayment(data: any, tplContent: TemplateRef<{}>) {
    this.modal.create({
      nzTitle: 'Xác nhận hoàn tiền',
      nzContent: 'ok',

    })
  }
}

