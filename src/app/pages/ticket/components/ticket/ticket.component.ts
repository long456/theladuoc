import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {TicketService} from "../../services/ticket.service";
import {BehaviorSubject, combineLatest, map, mergeMap, Observable, of, switchMap, tap, throwError} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit{

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList = [];

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  pageInfo = <any>{}

  ticketPage = Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    pageTotal: number;
  }>;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private ticketService: TicketService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    // this.ticketPage = combineLatest([
    //   this.page$,
    //   this.pageSize$,
    // ]).pipe(
    //   tap(() => this.loading = true),
    //   mergeMap((page, pageSize) => {
    //     return this.ticketService.getAllTicket()
    //   }),
    //   tap(() => this.loading = false),
    // )

    this.ticketService.getAllTicket().subscribe({
      next: res => {
        if (res.success) {
          this.rowData = res.data.ticketList;
          this.pageInfo = {
            page: res.data.paginationInfo.pageCurent,
            pageSize: res.data.paginationInfo.pageSize,
            pageTotal: res.data.paginationInfo.totalPages,
          }
        } else {
          this.message.error(res.errorMessages)
        }
      }
    })

    // this.ticketPage = this.ticketService.getAllTicket().pipe(
    //   tap(() => this.loading = true),
    //   map((res)=> {
    //     if (res.success) {
    //       return of({
    //         rows : res.data.ticketList,
    //         page: res.data.paginationInfo.pageCurent,
    //         pageSize: res.data.paginationInfo.pageSize,
    //         pageTotal: res.data.paginationInfo.totalPages,
    //       })
    //     } else {
    //       this.message.error(res.errorMessages)
    //       return throwError(() => {
    //           return res.errorMessages
    //         }
    //       )
    //     }
    //   }),
    //   tap(() => this.loading = false),
    // )


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
          this.ticketService.softDeleteTicket(this.itemSelectList).pipe(
            switchMap((res) => {
              if (res.success) {
                this.message.success(res.messages);
                return this.ticketService.getAllTicket();
              } else {
                return throwError(() =>{
                  return 'Lỗi trong quá trình xóa'
                })
              }
            },)
          ).subscribe({
            next: value => {
              if (value.success) {
                this.rowData = value.data.ticketList
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
