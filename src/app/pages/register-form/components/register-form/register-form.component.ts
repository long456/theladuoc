import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {AttachTicketComponent} from "../attach-ticket/attach-ticket.component";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList = [];

  loading = false;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  registerForm$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  constructor(
    private router: Router,
    private registerFormService: RegisterFormService,
    private message: NzMessageService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.registerForm$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.registerFormService.getAllForm(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value.data.formRegisterList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu form đăng ký')
              return of(err.message)
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  create() {
    this.router.navigate(['page/setting/register-form/create'])
  }

  edit(data: any) {
    this.router.navigate(['page/setting/register-form/' + data.id])
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.registerFormService.softDeleteTicket(this.itemSelectList)
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

  copyCode(data: any) {
    let code = `onclick="showFormRegister(`+ data.id +`)"`;
    navigator.clipboard.writeText(code);
    this.message.success(code + ' đã được copy');
  }

  attachTicket(data: any) {
    this.modal.create<AttachTicketComponent>({
      nzTitle: 'Gắn Vé',
      nzContent: AttachTicketComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        isCreate: true,
        data: data,
      },
      nzFooter: null
    });
  }
}
