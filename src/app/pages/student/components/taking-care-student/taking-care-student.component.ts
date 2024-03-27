import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {DetailStudentComponent} from "../detail-student/detail-student.component";
import {PaymentCheckComponent} from "../payment-check/payment-check.component";

@Component({
  selector: 'app-taking-care-student',
  templateUrl: './taking-care-student.component.html',
  styleUrls: ['./taking-care-student.component.scss']
})
export class TakingCareStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  rowData: any;

  isExpand = false;

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

  takeCareStudent$!: Observable<{
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
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.takeCareStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getTakeCareStudent(page, pageSize, filter)
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
              this.message.error('Lỗi load dữ liệu học viên đang chăm')
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

  detail(data: any) {

  }

  paymentCheck(data : any) {
    this.modal.create<PaymentCheckComponent>({
      nzTitle: 'Xác thực thanh toán',
      nzContent: PaymentCheckComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        studentData: data
      },
      nzOnOk: instance => {
        const data = instance.paymentForm.value;
        delete data.name
        this.studentService.setPaymentCheck(data).subscribe({
          next: res => {
            if (res.success) {
              this.pageSize$.next(10)
              this.message.success(res.messages)
            } else {
              this.message.error(res.errorMessages)
            }
          }
        })
      }
    });
  }

}
