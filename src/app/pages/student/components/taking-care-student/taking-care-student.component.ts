import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {DetailStudentComponent} from "../detail-student/detail-student.component";
import {PaymentCheckComponent} from "../payment-check/payment-check.component";
import {Tag} from "../../models/tag";
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {UpgradeCourseComponent} from "../upgrade-course/upgrade-course.component";
import {environment} from "../../../../../environments/environment";

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
    {
      title: 'Tên lớp',
      name: 'className',
    },
    {
      title: 'Khu vực',
      name: 'area',
      type: "select",
      value: 1,
      data: [
        {
          label: 'Miền Bắc',
          key: 1
        },
        {
          label: 'Miền Trung',
          key: 2
        },
        {
          label: 'Miền Nam',
          key: 3
        }
      ]
    },
    {
      title: 'Thẻ tag',
      name: 'tagNote',
      type: "select",
      data: [
        {
          label: 'Không nghe máy lần 1',
          key: 1
        },
        {
          label: 'Không nghe máy lần 2',
          key: 2
        },
        {
          label: 'Sai số điện thoại',
          key: 3
        },
        {
          label: 'Khách hàng chặn zalo',
          key: 4
        },
        {
          label: 'Đã gửi tin nhắn zalo',
          key: 5
        },
        {
          label: 'Không có nhu cầu',
          key: 6
        },
        {
          label: 'Hẹn chuyển khoản',
          key: 7
        },
        {
          label: 'Khách hàng chặn cuộc gọi',
          key: 8
        },
      ]
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

  listTag = Tag;

  note: string = '';

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  constructor(
    private message: NzMessageService,
    private studentService: StudentService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private drawerService: NzDrawerService
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

  handleExportExcel(event: any) {
    if(Object.keys(event).length === 0) {
      this.message.error('Các trường filter không được để trống');
      return;
    }
    this.studentService.updateExportStatus('pending');
    const data = {...event}
    data['process'] = 2;
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

  detail(data: any) {
    this.message.error('Chức năng này hiện chưa hoàn thiện, xin vui lòng thử lại sau!')
  }

  createFormData(data: any) {

    const formData = new FormData();
    for ( let key in data ) {
      formData.append(key, data[key]);
    }
    return formData
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
        const value = this.createFormData(data)
        this.studentService.setPaymentCheck(value).subscribe({
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

  upgradeCourse(data : any) {
    const modal: NzModalRef = this.modal.create<UpgradeCourseComponent>({
      nzTitle: 'Nâng cấp khóa học',
      nzContent: UpgradeCourseComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: data,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => modal.destroy()
        },
        {
          label: 'OK',
          type: 'primary',
          onClick: (instance) => {
            if (instance?.upgradeCourseForm.get('courseId')?.invalid) {
              this.message.error('Khóa học nâng cấp không được để trống');
              return;
            }

            if (instance?.upgradeCourseForm.get('classId')?.invalid) {
              this.message.error('Lớp học không được để trống');
              return;
            }

            const data = instance?.upgradeCourseForm.value;
            delete data.name
            const value = this.createFormData(data)

            this.studentService.upgradeCourseUser(value).subscribe({
              next: res => {
                if (res.success) {
                  modal.destroy()
                  this.pageSize$.next(10)
                  this.message.success(res.messages)
                } else {
                  this.message.error(res.errorMessages)
                }
              },
              error: err => {
                this.message.error('Lỗi nâng cấp khóa học')
              }
            })
          }
        },
      ],
    });
  }

  onTagChange(e: any, data: any ) {
    const tag = {
      userAffId: data.id,
      tagNote: e,
      saleNote: data.saleNote,
    }
    this.studentService.updateTag(tag).subscribe({
      next: res => {
        if (res.success) {
          this.message.success('Cập nhật thẻ tag thành công');
          this.pageSize$.next(10);
        } else {
          this.message.error(res.errorMessages);
        }
      }
    })
  }

  openDrawer(data: any): void {
    this.note = data.saleNote;
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ghi chú',
      nzContent: this.drawerTemplate,
      nzContentParams: data
    });

    drawerRef.afterClose.subscribe(() => {
      this.note = '';
    });
  }

  addNote(data: any) {
    const note = {
      userAffId: data.id,
      tagNote: data.tagNote,
      saleNote: this.note,
    }

    this.studentService.updateTag(note).subscribe({
      next: res => {
        if (res.success) {
          this.message.success('Cập nhật ghi chú thành công');
          this.pageSize$.next(10);
        } else {
          this.message.error(res.errorMessages);
        }

      }
    })
  }
}
