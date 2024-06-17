import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {WebConfigService} from "../../services/web-config.service";

@Component({
  selector: 'app-list-config',
  templateUrl: './list-config.component.html',
  styleUrls: ['./list-config.component.scss']
})
export class ListConfigComponent implements OnInit {

  COL_DATA_TYPE = COL_DATA_TYPE;

  webConfig$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  constructor(
    private message: NzMessageService,
    private router: Router,
    private webConfigService: WebConfigService,
  ) {}

  ngOnInit() {
    this.webConfig$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.webConfigService.getListConfig(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value.data.websiteList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu website')
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

  edit(data: any) {
    this.router.navigate(['/page/setting/website-config/config/' + data.id])
  }

}
