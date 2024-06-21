import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {FooterConfigService} from "../../../services/footer-config.service";
import {COL_DATA_TYPE} from "../../../../../shared/models/Table";

@Component({
  selector: 'app-list-footer',
  templateUrl: './list-footer.component.html',
  styleUrls: ['./list-footer.component.scss']
})
export class ListFooterComponent implements OnInit {
  COL_DATA_TYPE = COL_DATA_TYPE;

  footerConfig$ !: Observable<{
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
    private footerConfigService: FooterConfigService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.footerConfig$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.footerConfigService.getListFooterConfig(page, pageSize)
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
              this.message.error('Lỗi load dữ liệu danh sách footer');
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
    this.router.navigate(['/page/setting/website-config/footer/' + data.id]);
  }

  create() {
    this.router.navigate(['/page/setting/website-config/footer/create']);
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
          this.footerConfigService.softDeleteFooter(this.itemSelectList)
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
