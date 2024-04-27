import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {TicketService} from "../../../ticket/services/ticket.service";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {RegisterFormService} from "../../services/register-form.service";

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
    private ticketService: TicketService,
    private registerFormService: RegisterFormService,
  ) {
  }

  ngOnInit() {
    console.log(this.nzModalData)
    this.getListTicket()
  }

  // getListTicket(page: number) {
  //   this.ticketService.getAllTicket(page, this.pageSize).subscribe({
  //     next: value => {
  //       if (value.success) {
  //         this.optionList = value.data.ticketList;
  //       }
  //     }
  //   })
  // }

  getListTicket() {
    this.ticketService.getListAttachTicket(this.nzModalData.data.courseId).subscribe({
      next: res => {
        this.optionList = res;
      }
    })
  }

  loadMore() {

  }

  closeModal() {
    this.modal.destroy();
  }

  attachTicket() {
    if (!this.selectedTicket) {
      this.message.error('Lớp không được để trống')
      return
    }

    const data = {
      formRegisterId: this.nzModalData.data.id,
      ticketId: this.selectedTicket,
    }

    this.registerFormService.attachTicket(data)
      .subscribe({
        next: res => {
          this.loading = false;
          if (res.success) {
            this.message.success(res.messages)
            this.closeModal();
          } else {
            this.message.error(res.errorMessages)
          }
        },
        error: err => {
          this.message.error(err)
          this.loading = false;
        }
      })
  }
}
