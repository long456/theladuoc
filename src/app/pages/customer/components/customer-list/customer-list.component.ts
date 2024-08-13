import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;
  customer$ !: Observable<{
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
    private router: Router,
    private message: NzMessageService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.customer$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.customerService.getCustomerList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.customerList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu khách hàng');
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

  create(): void{
    this.router.navigate(['/page/customer/create']);
  }

  edit(data: any): void{
    this.router.navigate(['/page/customer/' + data.customerCode]);
  }

  assignRole(data: any): void {

  }
}
