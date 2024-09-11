import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {WithdrawRequestService} from "../../services/withdraw-request.service";

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.scss']
})
export class WithdrawRequestComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  loading = false;
  withdrawRequest$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private message: NzMessageService,
    private withdrawRequestService: WithdrawRequestService,
  ) {}

  ngOnInit() {
    this.withdrawRequest$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.withdrawRequestService.getListRefund(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.withdrawMoneys,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu yêu cầu rút tiền');
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

  activeWithdraw(data: any): void {
    this.withdrawRequestService.activeWithdraw(data.id).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
        } else {
          this.message.error(res.errorMessages);
        }
      }
    });
  }

  cancelWithdraw(data: any): void {
    this.withdrawRequestService.cancelWithdraw(data.id).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
        } else {
          this.message.error(res.errorMessages);
        }
      }
    });
  }
}
