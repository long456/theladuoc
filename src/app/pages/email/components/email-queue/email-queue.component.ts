import {Component, OnInit, TemplateRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmailService} from "../../services/email.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-email-queue',
  templateUrl: './email-queue.component.html',
  styleUrls: ['./email-queue.component.scss']
})
export class EmailQueueComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  emailQueue$!: Observable<{
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
  emailContent!: SafeHtml;

  isExpand = false;
  listOfColumn: filterItem[] = [
    FilterType['emailDate'],
    FilterType['emailSendBy'],
    FilterType['emailReceiveBy'],
    FilterType['subject'],
    FilterType['organizationName'],
  ];
  constructor(
    private router: Router,
    private message: NzMessageService,
    private emailService: EmailService,
    private modal: NzModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.emailQueue$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.emailService.getEmailQueue(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.emailQueueList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu nhật ký gửi mail');
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

  getDetailEmail(data: any, template: TemplateRef<{}>): void {
    this.emailService.getDetailEmailQueue(data.id).subscribe({
      next: res => {
        if (res.success) {
          const domParser = new DOMParser();
          const htmlElement = domParser.parseFromString(res.data.body, 'text/html');
          this.emailContent = this.sanitizer.bypassSecurityTrustHtml(htmlElement.body.outerHTML);
          this.viewContentEmail(template);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  viewContentEmail(template: TemplateRef<{}>): void{
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Nội dung Email',
      nzStyle: {top: '20px'},
      nzBodyStyle: {height: '80vh', overflowY: 'scroll'},
      nzContent: template,
      nzWidth: 800,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modal.destroy()
        },
      ],
    });
  }

  resendEmail(data: any): void {
    this.emailService.resendEmail(data.id).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
          this.pageSize$.next(10);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  setExpand(event: any) {
    this.isExpand = event;
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event);
  }
}
