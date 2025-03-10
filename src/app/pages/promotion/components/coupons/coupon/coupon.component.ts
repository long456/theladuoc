import {Component, OnInit} from '@angular/core';
import {CouponService} from "../../../services/coupon.service";
import { COL_DATA_TYPE } from 'src/app/shared/models/Table';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  COL_DATA_TYPE = COL_DATA_TYPE;
  couponPage$!: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  refreshTrigger$ = new BehaviorSubject<void>(undefined);
  loading = false;
  itemSelectList: number[] = [];

  constructor(
    private couponService: CouponService,
    private router: Router,
    private message: NzMessageService,
    private modal :NzModalService,
  ) {
  }

  ngOnInit():void {
    this.couponPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
      .pipe(
        tap(() => this.loading = true),
        mergeMap(([page, pageSize, filter]) => {
          return this.couponService.getListCoupon(page, pageSize, filter)
            .pipe(
              map((value) => {
                if (!value.success) {
                  throw new Error(value.errorMessages);
                }
                return {
                  rows: value.data.coupons,
                  page: value.data.paginationInfo.pageCurrent,
                  pageSize: value.data.paginationInfo.pageSize,
                  rowTotal: value.data.paginationInfo.totalItem,
                }
              }),
              catchError(err => {
                this.message.error(err.message? err.message : 'Lỗi load dữ liệu phiếu giảm giá');
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

  getItemSelection(e: any):void {
    this.itemSelectList = e;
  }

  create():void {
    this.router.navigate(['page/promotion/coupon/create']).then();
  }

  edit(data: any):void {
    this.router.navigate(['page/promotion/coupon/' + data.id]).then();
  }

  refreshData():void {
    this.refreshTrigger$.next();
  }

  delete(): void {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn');
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.couponService.softDeleteCoupon(this.itemSelectList).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.refreshData();
              } else {
                this.message.error(value.errorMessages);
              }
            },
            error: err => {
              this.message.error(err);
            }
          })
        }
      });
    }
  }
}
