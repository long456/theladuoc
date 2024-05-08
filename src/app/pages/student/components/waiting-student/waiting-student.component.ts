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
      title: 'Số tiền',
      name: 'price',
    },
    {
      title: 'Tên landing page',
      name: 'landingPageName',
    },
    {
      title: 'Nhân viên chăm sóc',
      name: 'caregiverName',
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
          label: 'Đã có tài khoản',
          key: true
        },
        {
          label: 'Chưa có tài khoản',
          key: false
        }
      ]
    },
    {
      title: 'Thanh toán',
      name: 'isPay',
      type: "select",
      value: true,
      data: [
        {
          label: 'Chưa thanh toán',
          key: 0
        },
        {
          label: 'Thanh toán một phần',
          key: 1
        },
        {
          label: 'Đã thanh toán',
          key: 2
        }
      ]
    },
    {
      title: 'Thuộc tổ chức',
      name: 'organizationName',
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
