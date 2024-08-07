import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {StaffService} from "../../services/staff.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList = [];

  loading = false;

  isExpand = false;

  listOfColumn: filterItem[] = [
    {
      title: 'Tên nhân viên',
      name: 'fullName',
    },
    {
      title: 'Email',
      name: 'email',
    },
    {
      title: 'SĐT',
      name: 'mobile',
    },
  ];

  staff$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService,
    private staffService: StaffService
  ) {
  }

  ngOnInit() {
    this.staff$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.staffService.getListStaff(page, pageSize, filter)
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
              this.message.error('Lỗi load dữ liệu khóa học')
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

  getItemSelection(e: any) {

  }

  create() {
    this.router.navigate(['/page/staff/create'])
  }

  delete() {}

  edit(data: any) {
    this.router.navigate(['/page/staff/'+ data.id])
  }

  log(data: any) {
    console.log(data)
  }
}
