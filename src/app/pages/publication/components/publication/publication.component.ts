import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {PublicationService} from "../../services/publication.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE

  publicationPage$ !: Observable<{
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
    private message: NzMessageService,
    private router: Router,
    private publicationService: PublicationService,
    private modal :NzModalService,
  ) {
  }

  ngOnInit() {
    this.publicationPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.publicationService.getListPublications(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.publicationList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu ấn phẩm')
              return of(err.message)
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  create() {
    this.router.navigate(['/page/setting/publication/create']);
  }

  softDelete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.publicationService.softDeletePublication(this.itemSelectList)
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

  copyLink(data: any) {
    navigator.clipboard.writeText(data.link);
    this.message.success(data.link + ' đã được copy');
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/publication/' + data.id]);
  }
}
