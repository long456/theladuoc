import {Component, OnInit} from '@angular/core';
import {Student} from "../../models/student";
import {StudentWaitingService} from "../../services/student-waiting.service";
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, switchMap, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {DetailStudentComponent} from "../detail-student/detail-student.component";

@Component({
  selector: 'app-waiting-student',
  templateUrl: './waiting-student.component.html',
  styleUrls: ['./waiting-student.component.scss']
})
export class WaitingStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  listOfColumn: filterItem[] = [
    {
      title: 'Ngày đăng ký',
      name: 'createdDate',
      type: "date-range"
    },
    {
      title: 'Loại vé',
      name: 'ticket',
      type: "select",
      value: 'vip',
      data: [
        {
          key: 'vip',
          label: 'VIP'
        },
        {
          key: 'free',
          label: 'FREE'
        },
        {
          key: 'premium',
          label: 'PREMIUM'
        }
      ]
    },
    {
      title: 'Tên học viên',
      name: 'name',
    },
    {
      title: 'Số điện thoại',
      name: 'mobile',
    },
    {
      title: 'Email',
      name: 'email',
    },
    {
      title: 'Mã học viên',
      name: 'code',
    },
    {
      title: 'Người giới thiệu',
      name: 'userRef',
    },
    {
      title: 'Tên diễn giả',
      name: 'lecturerName',
    },
    {
      title: 'Tên khóa học',
      name: 'courseName',
    },
    {
      title: 'Số điểm',
      name: '',
    },
    {
      title: 'Xác thực email',
      name: 'isAuthEmail',
      type: "select",
      value: true,
      data: [
        {
          label: 'Đã xác thực',
          key: true
        },
        {
          label: 'Chưa xác thực',
          key: false
        }
      ]
    },
    {
      title: 'Trạng thái',
      name: 'isAccount',
      type: "select",
      value: true,
      data: [
        {
          label: 'Đã xác thực',
          key: true
        },
        {
          label: 'Chưa xác thực',
          key: false
        }
      ]
    },
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
              this.message.error('Lỗi load dữ liệu học viên đang chờ')
              return of(err.message)
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

  setExpand(event: any) {
    this.isExpand = event
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

  detail(data: any) {
    this.studentService.setStudentData(data);

    this.modal.create({
      nzWidth: 'calc(70% - 256px)',
      nzTitle: 'Chi tiết học viên',
      nzContent: DetailStudentComponent,
      nzOnOk: () => console.log('Click ok')
    });
  }
}
