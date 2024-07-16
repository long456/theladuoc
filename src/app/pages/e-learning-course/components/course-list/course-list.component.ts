import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ECourseService} from "../../services/e-course.service";
import {NzModalService} from "ng-zorro-antd/modal";
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;
  course$ !: Observable<{
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
    private router: Router,
    private message: NzMessageService,
    private eCourseService:ECourseService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.course$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.eCourseService.getECourseList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.elearnings,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu danh mục khóa học');
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

  create() {
    this.router.navigate(['/page/e-course/create']);
  }

  edit(data: any) {
    this.router.navigate(['/page/e-course/' + data.id])
  }

  navigateToChapter(data: any) {
    this.router.navigate(['/page/e-course/chapter/' + data.id + '/list'])
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn');
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.eCourseService.softDeleteCourse(this.itemSelectList)
            .pipe(
            ).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.pageSize$.next(10);
              } else {
                this.message.error(value.errorMessages);
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

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }
}
