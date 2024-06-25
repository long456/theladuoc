import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {environment} from "../../../../../environments/environment";

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

  listOfColumn: filterItem[] = [
    FilterType['createdDate'],
    FilterType['ticketType'],
    FilterType['studentName'],
    FilterType['mobile'],
    FilterType['email'],
    FilterType['studentCode'],
    FilterType['userRef'],
    FilterType['lecturerName'],
    FilterType['courseName'],
    FilterType['price'],
    FilterType['isPay'],
    FilterType['landingPageName'],
    FilterType['isAuthEmail'],
    FilterType['isAccount'],
    FilterType['organizationName'],
  ];

  itemSelectList: number[] = [];

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
              this.message.error('Lỗi load dữ liệu học viên chưa chia');
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

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  handleExportExcel(event: any) {
    if(Object.keys(event).length === 0) {
      this.message.error('Các trường filter không được để trống');
      return;
    }
    this.studentService.updateExportStatus('pending');
    const data = {...event}
    data['process'] = 0;
    this.studentService.exportExcel(data).subscribe({
      next: res => {
        if (res.success) {
          this.studentService.updateExportStatus('completed');
          const baseUrl = environment.baseImgUrl
          const a = document.createElement('a');
          const url = baseUrl + res.data.filePath;
          a.href = url;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          a.remove();
        } else {
          this.studentService.updateExportStatus('error');
          this.message.error(res.errorMessages);
        }
      }
    })
  }

  takeCareStudent() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      let data = JSON.stringify(this.itemSelectList)
      this.studentService.takeCareStudent(data).subscribe({
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


  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  detail(data: any) {}

}
