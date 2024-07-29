import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {LessonService} from "../../services/lesson.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {CreateLessonComponent} from "../../../class/components/create-lesson/create-lesson.component";
import {AttachZoomLinkComponent} from "../attach-zoom-link/attach-zoom-link.component";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  lesson$ !: Observable<{
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
    private lessonService: LessonService,
    private modal :NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.lesson$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.lessonService.getListLesson(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.lessonList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu buổi học')
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

  edit(data: any) {
    this.modal.create<CreateLessonComponent>({
      nzTitle: 'Sửa buổi học',
      nzContent: CreateLessonComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        isCreate: false,
        data: data,
      },
      nzFooter: null,
      nzOnOk: instance => {
        this.pageSize$.next(10);
      }
    });
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.lessonService.softDeleteLesson(this.itemSelectList)
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

  attachLinkZoom(data: any):void {
    this.modal.create<AttachZoomLinkComponent>({
      nzTitle: 'Gắn link zoom',
      nzContent: AttachZoomLinkComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: data,
      nzFooter: null,
      nzOnOk: instance => {
        this.pageSize$.next(10);
      }
    });
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }
}
