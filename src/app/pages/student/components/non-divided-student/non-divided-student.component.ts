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
