import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {EmailSmtpService} from "../../services/email-smtp.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-email-account',
  templateUrl: './email-account.component.html',
  styleUrls: ['./email-account.component.scss']
})
export class EmailAccountComponent implements OnInit {

  COL_DATA_TYPE = COL_DATA_TYPE;
  loading = false;

  emailAccount$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private message: NzMessageService,
    private emailSmtpService: EmailSmtpService,
    private modal :NzModalService,
  ) {
  }

  ngOnInit() {
    this.emailAccount$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.emailSmtpService.getListEmailAccount(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.emailAccounts,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu Email smtp')
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
    this.router.navigate(['page/setting/email-account/create']);
  }

  edit(data: any) {
    this.router.navigate(['page/setting/email-account/' + data.id]);
  }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa mục đã chọn ?',
      nzOnOk: () => {
        this.emailSmtpService.softDeleteEmailAccount(data.id).subscribe({
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
