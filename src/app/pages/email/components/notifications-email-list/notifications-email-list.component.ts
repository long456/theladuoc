import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {EmailService} from "../../services/email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications-email-list',
  templateUrl: './notifications-email-list.component.html',
  styleUrls: ['./notifications-email-list.component.scss']
})
export class NotificationsEmailListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList: number[] = [];

  notificationsEmail$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  typeEmailList$: Observable<any> = this.emailService.getEmailType();

  constructor(
    private emailService: EmailService,
    private message: NzMessageService,
    private modal :NzModalService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.notificationsEmail$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.typeEmailList$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, type]) => {
        return this.emailService.getListNotificationsEmail(page, pageSize)
          .pipe(
            map((value) => {
              const resData = {
                rows: value.data.emailTemplateList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              };

              resData.rows.map((item : any) => {
                for (const ele of type.data) {
                 if (item.notiEmailTemplateType === ele.dataValue) {
                   item['typeName'] = ele.name;
                 }
                }
              });

              return resData;
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu email thông báo');
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
    );
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  create() {
    this.router.navigate(['/page/setting/email/notifications-email/create'])
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/email/notifications-email/' + data.id])
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
      nzOnOk: () => {
        this.emailService.softDeleteNotificationsEmail(this.itemSelectList)
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
