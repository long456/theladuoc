import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  order$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  loading = false;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.order$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.orderService.getOrderList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.offerList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu đơn hàng');
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

  create() {}

  edit(data: any): void{

  }

  delete(data: any):void{

  }
}
