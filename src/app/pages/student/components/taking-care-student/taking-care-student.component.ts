import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, combineLatest, delay, map, mergeMap, Observable, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {StudentService} from "../../services/student.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {DetailStudentComponent} from "../detail-student/detail-student.component";
import {PaymentCheckComponent} from "../payment-check/payment-check.component";

@Component({
  selector: 'app-taking-care-student',
  templateUrl: './taking-care-student.component.html',
  styleUrls: ['./taking-care-student.component.scss']
})
export class TakingCareStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  rowData: any;

  isExpand = false;

  listOfColumn: filterItem[] = []

  takeCareStudent$!: Observable<{
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

  constructor(
    private message: NzMessageService,
    private studentService: StudentService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.takeCareStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getWaitingStudent(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.users,
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

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  detail(data: any) {

  }

  paymentCheck(data : any) {
    this.modal.create<PaymentCheckComponent>({
      nzTitle: 'Modal Title',
      nzContent: PaymentCheckComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        studentData: data
      },
      nzOnOk: instance => {
        const data = instance.paymentForm.value;
        delete data.name
        this.studentService.setPaymentCheck(data).subscribe({
          next: res => {
            if (res.success) {
              this.pageSize$.next(10)
              this.message.success(res.messages)
            } else {
              this.message.error(res.errorMessages)
            }
          }
        })
      }
    });
  }

}
