import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {HeaderConfigService} from "../../../services/header-config.service";
import {NzModalService} from "ng-zorro-antd/modal";
@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  COL_DATA_TYPE = COL_DATA_TYPE;

  headerConfig$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;
  itemSelectList: number[] = [];

  constructor(
    private message: NzMessageService,
    private router: Router,
    private headerConfigService: HeaderConfigService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.headerConfig$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.headerConfigService.getListHeaderConfig(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value.data.pageList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu danh sách header')
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
    this.router.navigate(['/page/setting/website-config/header/' + data.id]);
  }

  create() {
    this.router.navigate(['/page/setting/website-config/header/create']);
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn');
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.headerConfigService.softDeleteHeader(this.itemSelectList)
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
}
