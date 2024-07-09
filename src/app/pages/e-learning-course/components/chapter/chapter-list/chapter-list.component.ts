import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ChapterService} from "../../../services/chapter.service";

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;
  itemSelectList: number[] = [];
  loading = false;
  eCourseId!: number;

  chapterPage$ !: Observable<{
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
    private chapterService: ChapterService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe().subscribe(params => {
      const {courseId} = params;
      this.eCourseId = courseId;
    });

    this.chapterPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.chapterService.getChapterList(this.eCourseId, page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.elearnings,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu học phần')
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

  getItemSelection(e: any) {}

  create() {}

  delete() {}
}
