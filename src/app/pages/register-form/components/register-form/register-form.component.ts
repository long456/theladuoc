import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem, FilterType} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, take, tap} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {AttachTicketComponent} from "../attach-ticket/attach-ticket.component";
import {FilterModalService} from "../../../../shared/services/filter-modal.service";


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
  filterList$ = new BehaviorSubject<any>(null);

  registerForm$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  currentFilter: any = {}

  constructor(
    private router: Router,
    private registerFormService: RegisterFormService,
    private message: NzMessageService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private filterModalService: FilterModalService,
  ) {
  }

  ngOnInit() {
    this.registerForm$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.registerFormService.getAllForm(page, pageSize, filter)
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

    this.modal.afterAllClose.subscribe({
      next: value => {
        this.pageSize$.next(10)
      }
    })
  }

  removeAttachTicket(data: any):void {
    this.modal.confirm({
      nzTitle: 'Xác nhận gỡ vé',
      nzContent: 'Bạn có chắc muốn gỡ vé ' + data.ticketName + ' ra khỏi form ?',
      nzOnOk: () => {
        const formRegisterId = {
          formRegisterId: data.id
        }

        this.registerFormService.removeAttachTicket(formRegisterId).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.pageSize$.next(10)
            } else {
              this.message.error(res.errorMessages)
            }
          },
          error: err => {
            this.message.error(err)
          }
        })
      }
    });
  }

  filter() {
    const data = {
      filterData: [
        FilterType['createdDate'],
        FilterType['nameForm'],
        FilterType['organizationName'],
      ],
      currentFilter: this.currentFilter,
    };
    this.filterModalService.getFilter(data);
    this.filterModalService.filter
      .pipe(
        take(1),
      )
      .subscribe((value ) => {
        this.currentFilter = value;
        this.filterList$.next(value);
      })
  }
}
