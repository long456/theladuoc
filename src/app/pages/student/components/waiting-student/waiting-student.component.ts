import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, switchMap, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {DetailStudentComponent} from "../detail-student/detail-student.component";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-waiting-student',
  templateUrl: './waiting-student.component.html',
  styleUrls: ['./waiting-student.component.scss']
})
export class WaitingStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  listOfColumn: filterItem[] = [
    FilterType['createdDate'],
    FilterType['ticketType'],
    FilterType['studentName'],
    FilterType['mobile'],
    FilterType['email'],
    FilterType['studentCode'],
    FilterType['emailRef'],
    FilterType['lecturerName'],
    FilterType['courseName'],
    FilterType['price'],
    FilterType['isPay'],
    FilterType['landingPageName'],
    FilterType['caregiverName'],
    FilterType['isAuthEmail'],
    FilterType['isAccount'],
    FilterType['organizationName'],
  ];

  rowData: any;

  isExpand = false;

  waitingStudent$!: Observable<{
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
    private message: NzMessageService,
    private studentService: StudentService,
    private modal: NzModalService
  ) {
  }

  ngOnInit() {
    this.waitingStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getWaitingStudent(page, pageSize, filter)
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
    )
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
    data['process'] = 1;
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

  setExpand(event: any) {
    this.isExpand = event
  }

  takeCareStudent() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.loading = true;
      let data = JSON.stringify(this.itemSelectList);
      this.studentService.takeCareStudent(data).pipe(
        delay(200),
        tap(() => this.loading = false),
      ).subscribe({
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

  rejectStudent(){
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.loading = true;
      let data = JSON.stringify(this.itemSelectList)
      this.studentService.rejectStudent(data).pipe(
        delay(200),
        tap(() => this.loading = false),
      ).subscribe({
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

  detail(data: any) {
    this.studentService.setStudentData(data);

    this.modal.create({
      nzWidth: 'calc(70% - 256px)',
      nzTitle: 'Chi tiết học viên',
      nzContent: DetailStudentComponent,
      nzOnOk: () => console.log('Click ok')
    });
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }
}
