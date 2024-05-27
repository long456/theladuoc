import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {StudyingStudentService} from "../../services/studying-student.service";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {StudentService} from "../../services/student.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Tag} from "../../models/tag";

@Component({
  selector: 'app-studying-student',
  templateUrl: './studying-student.component.html',
  styleUrls: ['./studying-student.component.scss']
})
export class StudyingStudentComponent implements OnInit{

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
      title: 'Thuộc tổ chức',
      name: 'organizationName',
    },
    {
      title: 'Nhân viên chăm sóc',
      name: 'caregiverName',
    },
    {
      title: 'Khóa học gần nhất',
      name: 'latestCourseName',
    },
    {
      title: 'Tổng học phí',
      name: 'totalPrice',
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

  studyingStudent$!: Observable<{
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

  constructor(
    private studentService: StudentService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.studyingStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getStudyingStudent(page, pageSize, filter)
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
              this.message.error('Lỗi load dữ liệu học viên đang học')
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

  onTagChange(e: any, data: any ) {
    const tag = {
      userAffId: data.id,
      tagNote: e,
      saleNote: "",
    }
    this.studentService.updateTag(tag).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
          this.pageSize$.next(10);
        } else {
          this.message.error(res.errorMessages);
        }
      }
    })
  }

}
