import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {RequestUpgradeService} from "../../services/request-upgrade.service";

@Component({
  selector: 'app-request-upgrade',
  templateUrl: './request-upgrade.component.html',
  styleUrls: ['./request-upgrade.component.scss']
})
export class RequestUpgradeComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  requestUpgrade$ !: Observable<{
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
    private requestUpgradeService: RequestUpgradeService,
  ) {
  }

  ngOnInit() {
    this.requestUpgrade$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.requestUpgradeService.getRequestUpgradeList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.orders,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu danh sách yêu cầu nâng hạng');
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
}
