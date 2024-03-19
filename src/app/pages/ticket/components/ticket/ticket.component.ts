import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {TicketService} from "../../services/ticket.service";
import {
  BehaviorSubject,
  catchError,
  combineLatest, delay,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList = [];

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  ticketPage$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private ticketService: TicketService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.ticketPage$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) => {
        return this.ticketService.getAllTicket(page, pageSize)
          .pipe(
            map((value) => {
              return {
                rows: value.data.ticketList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  create() {
    this.router.navigate(['page/setting/ticket/create'])
  }

  edit(data: any) {
    this.router.navigate(['page/setting/ticket/' + data.id])
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.ticketService.softDeleteTicket(this.itemSelectList)
            .pipe(
              // switchMap((res) => {
              //   if (res.success) {
              //     this.message.success(res.messages);
              //     return this.ticketService.getAllTicket();
              //   } else {
              //     return throwError(() =>{
              //       return 'Lỗi trong quá trình xóa'
              //     })
              //   }
              // },)
            ).subscribe({
              next: value => {
                if (value.success) {
                  // this.rowData = value.data.ticketList
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

}
