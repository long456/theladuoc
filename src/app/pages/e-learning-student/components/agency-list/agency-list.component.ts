import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {ELearningStudentService} from "../../services/e-learning-student.service";

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  agencyListPage$!: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  refreshTrigger$ = new BehaviorSubject<void>(undefined);
  loading = false;
  constructor(
    private router: Router,
    private message: NzMessageService,
    private modal :NzModalService,
    private eLearningStudentService: ELearningStudentService,
  ) {}

  ngOnInit():void {
    this.agencyListPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.eLearningStudentService.getAgencyList(page, pageSize, filter)
          .pipe(
            map((value) => {
              if (!value.success) {
                throw new Error(value.errorMessages);
              }
              return {
                rows: value.data.users,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error(err? err.message : 'Lỗi load dữ liệu danh sách đại lý');
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

  refreshData():void {
    // Load lại trang danh sách
    this.refreshTrigger$.next();
  }

  disableAgency(data: any) {
    this.modal.confirm({
      nzTitle: 'Hủy quyền đại lý',
      nzContent: 'Bạn chắc chắn muốn hủy quyền của đại lý này?',
      nzOnOk: () => {
        this.eLearningStudentService.disableAgency(data.id).subscribe({
          next: value => {
            if (value.success) {
              this.message.success(value.messages);
              this.refreshData();
            } else {
              this.message.error(value.errorMessages);
            }
          },
          error: err => {
            this.message.error(err? err : 'Lỗi hủy quyền đại lý');
          }
        })
      }
    });
  }
}
