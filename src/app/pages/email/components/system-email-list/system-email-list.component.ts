import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-system-email-list',
  templateUrl: './system-email-list.component.html',
  styleUrls: ['./system-email-list.component.scss']
})
export class SystemEmailListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  systemEmail$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  constructor(
    private emailService: EmailService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.systemEmail$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.emailService.getListSystemEmail(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value.data.emailTemplateList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu email hệ thống')
              return of(err.message)
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/email/system-email/' + data.id])
  }
}
