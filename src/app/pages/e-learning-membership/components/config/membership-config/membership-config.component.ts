import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {MembershipConfigService} from "../../../services/membership-config.service";

@Component({
  selector: 'app-membership-config',
  templateUrl: './membership-config.component.html',
  styleUrls: ['./membership-config.component.scss']
})
export class MembershipConfigComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  membershipConfig$ !: Observable<{
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
    private membershipConfigService: MembershipConfigService
  ) {}

  ngOnInit() {
    this.membershipConfig$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.membershipConfigService.getMembershipConfigList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.listPolicy,
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

  edit(data: any) {}
}
