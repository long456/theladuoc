import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ClassService} from "../../services/class.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {CreateLessonComponent} from "../create-lesson/create-lesson.component";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  COL_DATA_TYPE = COL_DATA_TYPE;

  class$ !: Observable<{
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

  modalLoading = true

  constructor(
    private router: Router,
    private message: NzMessageService,
    private classService: ClassService,
    private modal :NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.class$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.classService.getClassList(page, pageSize, filter)
        .pipe(
          map((value) => {
            return {
              rows: value.data.classList,
              page: value.data.paginationInfo.pageCurrent,
              pageSize: value.data.paginationInfo.pageSize,
              rowTotal: value.data.paginationInfo.totalItem,
            }
          }),
          catchError(err => {
            this.message.error('Lỗi load dữ liệu lớp học')
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
    this.router.navigate(['page/setting/class/create'])
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.classService.softDeleteClass(this.itemSelectList)
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

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  edit(data: any) {
    this.router.navigate(['page/setting/class/' + data.id])
  }

  addLesson(data: any) {
    const modal: NzModalRef = this.modal.create<CreateLessonComponent>({
      nzTitle: 'Tạo buổi học',
      nzContent: CreateLessonComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        isCreate: true,
        data: data,
      },
      nzFooter: null
    });
  }
}
