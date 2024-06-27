import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {StudentService} from "../../services/student.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Tag} from "../../models/tag";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {RefundRequestComponent} from "../refund-request/refund-request.component";
import {PaymentCheckComponent} from "../payment-check/payment-check.component";

@Component({
  selector: 'app-studying-student',
  templateUrl: './studying-student.component.html',
  styleUrls: ['./studying-student.component.scss']
})
export class StudyingStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  rowData: any;

  isExpand = false;

  listOfColumn: filterItem[] = [
    FilterType['createdDate'],
    FilterType['studentName'],
    FilterType['mobile'],
    FilterType['email'],
    FilterType['studentCode'],
    FilterType['userRef'],
    FilterType['lecturerName'],
    FilterType['caregiverName'],
    FilterType['price'],
    FilterType['isPay'],
    FilterType['organizationName'],
  ];

  studyingStudent$!: Observable<{
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

  listTag = Tag;

  constructor(
    private studentService: StudentService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit() {
    this.studyingStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.studentService.getStudyingStudent(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.users,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu học viên đang học');
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

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  detail(data: any) {

  }

  onTagChange(e: any, data: any ) {
    const tag = {
      userAffId: data.id,
      tagNote: e,
      saleNote: "",
    }
    this.studentService.updateTag(tag).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
          this.pageSize$.next(10);
        } else {
          this.message.error(res.errorMessages);
        }
      }
    })
  }

  refundPayment(data: any) {
    const modal: NzModalRef = this.modal.create<RefundRequestComponent>({
      nzTitle: 'Yêu cầu hoàn tiền',
      nzContent: RefundRequestComponent,
      nzData: data,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modal.destroy()
        },
        {
          label: 'Xác nhận',
          type: 'primary',
          onClick: (instance) => {
            if (!(instance instanceof RefundRequestComponent) || instance.refundForm.valid) {
              modal.triggerOk().then();
            } else {
              instance.isSubmit = true
            }
          }

        }
      ],
      nzOnOk: instance => {
        const refundData = instance.refundForm.value;
        delete refundData.name;
        const value = this.createFormData(refundData);
        this.studentService.createRefundRequest(value).subscribe({
          next: res => {
            if (res.success) {
              this.pageSize$.next(10)
              this.message.success(res.messages)
            } else {
              this.message.error(res.errorMessages)
            }
          },
          error: err => {}
        })
      }
    });
  }

  createFormData(data: any) {

    const formData = new FormData();
    for ( let key in data ) {
      formData.append(key, data[key]);
    }
    return formData
  }

}
