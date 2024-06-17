import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, switchMap, tap} from "rxjs";
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  isExpand = false;

  listOfColumn: filterItem[] = [
    {
      title: 'Ngày đăng ký',
      name: 'createdDate',
      type: "date-range"
    },
    {
      title: 'Tên tổ chức',
      name: 'organizationName',
    },
    {
      title: 'Tên diễn giả',
      name: 'teacherName',
    },
    {
      title: 'Tên khóa học',
      name: 'title',
    },
    {
      title: 'Trạng thái',
      name: 'status',
      type: "select",
      value: 1,
      data: [
        {
          label: 'Hiển thị',
          key: 1
        },
        {
          label: 'Không hiện thị',
          key: 0
        }
      ]
    },
  ]

  itemSelectList: number[] = [];

  coursePage$ !: Observable<{
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
    private courseService : CourseService,
    private router: Router,
    private message: NzMessageService,
    private modal :NzModalService,
  ) {
  }

  ngOnInit() {
    this.coursePage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.courseService.getAllCourse(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.courseList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu khóa học')
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

  create() {
    this.router.navigate(['/page/setting/course/create']);
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/course/' + data.id])
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.courseService.softDeleteCourse(this.itemSelectList)
            .pipe(
            ).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.pageSize$.next(10)
              } else {
                this.message.error(value.errorMessages)
              }
            },
            error: err => {
              this.message.error(err.error);
            }
          })
        }
      });
    }
  }


}
