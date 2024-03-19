import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject, combineLatest, delay, map, mergeMap, Observable, tap} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

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
    private modal: NzModalService
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
}
