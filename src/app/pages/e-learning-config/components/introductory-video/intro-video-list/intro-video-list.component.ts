import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {IntroVideoService} from "../../../services/intro-video.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-intro-video-list',
  templateUrl: './intro-video-list.component.html',
  styleUrls: ['./intro-video-list.component.scss']
})
export class IntroVideoListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  introVideoPage$!: Observable<{
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
  constructor(
    private router: Router,
    private message: NzMessageService,
    private introVideoService: IntroVideoService
  ) {}

  ngOnInit() {
    this.introVideoPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.introVideoService.getIntroVideoList(page, pageSize, filter)
          .pipe(
            map((value) => {
              if (!value.success) {
                throw new Error(value.errorMessages);
              }
              return {
                rows: value.data.organizations,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error(err.message? err.message : 'Lỗi load dữ liệu danh sách video giới thiệu');
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

  edit(data: any):void {
    this.router.navigate(['page/e-learning-config/intro-video/' + data.id]);
  }
}
