import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningStudentService} from "../../services/e-learning-student.service";

@Component({
  selector: 'app-studying-e-student',
  templateUrl: './studying-e-student.component.html',
  styleUrls: ['./studying-e-student.component.scss']
})
export class StudyingEStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  studyingEStudent$!: Observable<{
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
    private eLearningStudentService: ELearningStudentService,
  ) {}

  ngOnInit() {
    this.studyingEStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.eLearningStudentService.getStudyingEStudent(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.users,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu học viên đang học');
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
}
