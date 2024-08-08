import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {AttendanceService} from "../../services/attendance.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.scss']
})
export class ListAttendanceComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  listAttendance$ !: Observable<{
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

  isExpand = false;
  listOfColumn: filterItem[] = [
    FilterType['courseName'],
    FilterType['className'],
    FilterType['studentName'],
    FilterType['lessonName'],
    FilterType['speakerName'],
  ];
  constructor(
    private router: Router,
    private message: NzMessageService,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit() {
    this.filterList$.pipe(
      tap(() => this.page$.next(1)) // Reset page to 1 when filter changes
    ).subscribe();

    this.listAttendance$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.attendanceService.getAttendanceList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.attendanceList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu điểm danh')
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
    );
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  handleExportExcel(event: any) {
    this.message.error('Chức năng này hiện chưa hoàn thiện, xin vui lòng thử lại sau!')
  }
}
