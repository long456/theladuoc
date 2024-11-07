import { Component, OnInit } from '@angular/core';
import { COL_DATA_TYPE } from 'src/app/shared/models/Table';
import { BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ELearningConfigService } from "../../services/config.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: [ './config-list.component.scss' ]
})
export class ConfigListComponent implements OnInit {
  COL_DATA_TYPE = COL_DATA_TYPE;
  configListPage$!: Observable<{
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
    private router: Router,
    private message: NzMessageService,
    private eLearningConfigService: ELearningConfigService,
  ) { }

  ngOnInit() {
    this.configListPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
      .pipe(
        tap(() => this.loading = true),
        mergeMap(([ page, pageSize, filter ]) => {
          return this.eLearningConfigService.getConfigList(page, pageSize, filter)
            .pipe(
              map((value) => {
                if (!value.success) throw new Error(value.errorMessages);
                return {
                  rows: value.data.organizations,
                  page: value.data.paginationInfo.pageCurrent,
                  pageSize: value.data.paginationInfo.pageSize,
                  rowTotal: value.data.paginationInfo.totalItem,
                }
              }),
              catchError(err => {
                this.message.error(err.message ? err.message : 'Lỗi load dữ liệu cấu hình của E-learning');
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

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  navigateHomeConfig(): void {
    this.router.navigate(['page/e-learning-config/home-page']);
  }

  navigateGeneralConfig(): void {
    this.router.navigate(['page/e-learning-config/general']);
  }
}
