import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-non-divided-student',
  templateUrl: './non-divided-student.component.html',
  styleUrls: ['./non-divided-student.component.scss']
})
export class NonDividedStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  isExpand = false;

  nonDivideStudent$!: Observable<{
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

  listOfColumn: filterItem[] = []

  constructor(
    private router: Router,
    private message: NzMessageService,
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.nonDivideStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getNoneDivideStudent(page, pageSize, filter)
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
              this.message.error('Lỗi load dữ liệu học viên chưa chia')
              return of(err.message)
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  takeCareStudent(data: any) {
    this.studentService.takeCareStudent(data.id).subscribe({
      next: res => {
        if (res.success) {
          this.pageSize$.next(10);
          this.message.success(res.messages)
        } else {
          this.message.error(res.errorMessages)
        }
      }
    })
  }

  rejectStudent(data: any){
    this.studentService.rejectStudent(data.id).subscribe({
      next: res => {
        if (res.success) {
          this.pageSize$.next(10);
          this.message.success(res.messages)
        } else {
          this.message.error(res.errorMessages)
        }
      }
    })
  }

}
