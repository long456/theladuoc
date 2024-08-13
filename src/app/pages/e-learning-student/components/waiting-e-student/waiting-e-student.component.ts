import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningStudentService} from "../../services/e-learning-student.service";
import {HandleEStudentService} from "../../services/handle-e-student.service";

@Component({
  selector: 'app-waiting-e-student',
  templateUrl: './waiting-e-student.component.html',
  styleUrls: ['./waiting-e-student.component.scss']
})
export class WaitingEStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  waitingEStudent$!: Observable<{
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
    private eLearningStudentService: ELearningStudentService,
    private handleEStudentService: HandleEStudentService
  ) {}

  ngOnInit() {
    this.waitingEStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.eLearningStudentService.getWaitingEStudent(page, pageSize, filter)
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
              this.message.error('Lỗi load dữ liệu học viên đang chờ');
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

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  takeCareStudent() {
    this.handleEStudentService.takeCareStudent(this.itemSelectList);
    this.handleEStudentService.status$.subscribe({
      next: value => {
        if (value) {
          this.pageSize$.next(this.pageSize$.getValue());
        }
      }
    });
  }

  refuseCare() {
    this.handleEStudentService.refuseCareStudent(this.itemSelectList);
    this.handleEStudentService.status$.subscribe({
      next: value => {
        if (value) {
          this.pageSize$.next(this.pageSize$.getValue());
        }
      }
    });
  }

}
