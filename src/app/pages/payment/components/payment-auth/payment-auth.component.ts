import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PaymentAuthService} from "../../services/payment-auth.service";
import {environment} from "../../../../../environments/environment";
import {NzImageService} from "ng-zorro-antd/image";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-payment-auth',
  templateUrl: './payment-auth.component.html',
  styleUrls: ['./payment-auth.component.scss']
})
export class PaymentAuthComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;

  isExpand = false;

  paymentAuth$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  listOfColumn: filterItem[] = [
    FilterType['createdDate'],
    FilterType['studentName'],
    FilterType['mobile'],
    FilterType['email'],
    FilterType['caregiverName'],
    FilterType['price'],
    FilterType['verifyPay'],
  ];

  constructor(
    private router: Router,
    private message: NzMessageService,
    private paymentAuthService: PaymentAuthService,
    private nzImageService: NzImageService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.paymentAuth$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.paymentAuthService.getListPayment(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.paymentHistories,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu xác thực thanh toán');
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

  showImg(data: any) {
    const baseUrl = environment.baseImgUrl
    const img = [
      {
        src: baseUrl + data.receiptImage
      }
    ]
    this.nzImageService.preview(img, { nzZoom: 1, nzRotate: 0 });
  }

  verifyPayment(data: any) {
    this.modal.confirm({
      nzTitle: 'Xác nhận thanh toán',
      nzContent: 'Bạn có muốn xác thực cho thanh toán này?',
      nzOnOk: () => {
        this.paymentAuthService.updatePayment(data.id).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.pageSize$.next(10);
            } else {
              this.message.error(res.errorMessages);
            }
          }
        })
      }
    });
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }
}
