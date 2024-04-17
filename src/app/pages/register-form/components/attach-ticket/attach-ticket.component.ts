import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {TicketService} from "../../../ticket/services/ticket.service";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";

@Component({
  selector: 'app-attach-ticket',
  templateUrl: './attach-ticket.component.html',
  styleUrls: ['./attach-ticket.component.scss']
})
export class AttachTicketComponent implements OnInit{

  readonly nzModalData= inject(NZ_MODAL_DATA);

  loading: boolean = false;

  selectedTicket = null;

  optionList: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  pageTotal: number = 0;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private ticketService: TicketService
  ) {
  }

  ngOnInit() {
    this.getListTicket(this.page);
  }

  getListTicket(page: number) {
    this.ticketService.getAllTicket(page, this.pageSize).subscribe({
      next: value => {
        if (value.success) {
          this.optionList = value.data.ticketList;
        }
      }
    })
  }

  loadMore() {

  }
}
