import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {LoyaltyService} from "../../services/loyalty.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loyalty-list',
  templateUrl: './loyalty-list.component.html',
  styleUrls: ['./loyalty-list.component.scss']
})
export class LoyaltyListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  loyalty$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  constructor(
    private loyaltyService: LoyaltyService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loyalty$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.loyaltyService.getListLoyalty(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value,
                // page: value.data.paginationInfo.pageCurrent,
                // pageSize: value.data.paginationInfo.pageSize,
                // rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu cuộc thi tính điểm')
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

  create() {
    this.router.navigate(['/page/setting/referral/loyalty/create']);
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/referral/loyalty/' + data.loyaltyCode]);
  }
}
