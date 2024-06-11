import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AttendanceService} from "../../services/attendance.service";
import {LessonService} from "../../../lesson/services/lesson.service";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  attendance$ !: Observable<{
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

  itemSelectList: number[] = [];

  constructor(
    private router: Router,
    private message: NzMessageService,
    private attendanceService: AttendanceService,
    private lessonService: LessonService,
  ) {}

  ngOnInit() {
    this.attendance$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
      .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.lessonService.getListLesson(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.lessonList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu lớp học')
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

  copyLink(data: any):void{
    navigator.clipboard.writeText(data.attendanceLink);
    this.message.success(data.attendanceLink + ' đã được copy');
  }
}
