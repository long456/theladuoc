import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ResourcesService} from "../../../services/resources.service";
import {NzModalService} from "ng-zorro-antd/modal";
@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  itemSelectList: number[] = [];
  loading = false;
  eCourseId!: number;
  resourcesPage$!: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  refreshTrigger$ = new BehaviorSubject<void>(undefined);
  constructor(
    private router: Router,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private modal :NzModalService,
    private resourcesService: ResourcesService,
  ) {}

  ngOnInit() {
    this.route.params.pipe().subscribe(params => {
      const {courseId} = params;
      this.eCourseId = courseId;
    });

    this.resourcesPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.resourcesService.getResourcesList(this.eCourseId, page, pageSize, filter)
          .pipe(
            map((value) => {
              if (!value.success) {
                throw new Error(value.errorMessages);
              }
              return {
                rows: value.data.resources,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error(err.message? err.message : 'Lỗi load dữ danh sách tài nguyên');
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

  refreshData() {
    this.refreshTrigger$.next();
  }

  backToCourse() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/e-course-list']);
    }
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  create() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/resources/'+ this.eCourseId + '/create']);
    }
  }

  edit(data: any) {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/resources/'+ this.eCourseId + '/' + data.id]);
    }
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.resourcesService.softDeleteResources(this.itemSelectList)
            .pipe(
            ).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.refreshData();
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
}
