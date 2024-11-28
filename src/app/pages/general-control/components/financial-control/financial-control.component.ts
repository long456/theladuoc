import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  tap
} from "rxjs";
import {UserControlService} from "../../services/user-control.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserData} from "../../models/UserData";
import {COL_DATA_TYPE} from "../../../../shared/models/Table";

interface PaginatedResponse {
  rows: any[];
  page: number;
  pageSize: number;
  rowTotal: number;
}

@Component({
  selector: 'app-financial-control',
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss']
})
export class FinancialControlComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  currentUser!: UserData;
  currentSelection: number = 1;

  commissionStatistics$!: Observable<PaginatedResponse>;
  transactionHistory$!: Observable<PaginatedResponse>;
  withdrawalHistory$!: Observable<PaginatedResponse>;
  accountBalance$!: Observable<any>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  loading = false;

  constructor(
    private userControlService: UserControlService,
    private message: NzMessageService,
  ) {}

  ngOnInit():void {
    this.subscription = this.userControlService.data$.subscribe({
      next: data => {
        if (data) {
          this.currentUser = data;
          this.initCommission();
          this.initTransaction();
          this.initWithdrawal();
          this.initAccountBalance();
        }
      }
    });
  }

  private createPaginatedObservable(
    fetchMethod: (page: number, pageSize: number) => Observable<any>,
    errorMessage: string
  ): Observable<PaginatedResponse> {
    return combineLatest([
      this.page$,
      this.pageSize$,
    ]).pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize]) =>
        fetchMethod(page, pageSize).pipe(
          map((value) => {
            if (!value.success) {
              throw new Error(value.errorMessages);
            }
            return {
              rows: value.data.paginationList,
              page: value.data.paginationInfo.pageCurrent,
              pageSize: value.data.paginationInfo.pageSize,
              rowTotal: value.data.paginationInfo.totalItem,
            };
          }),
          catchError(err => {
            this.message.error(err.message || errorMessage);
            return of({
              rows: [],
              page: 0,
              pageSize: 0,
              rowTotal: 0
            });
          })
        )
      ),
      delay(200),
      tap(() => this.loading = false)
    );
  }

  initCommission(): void {
    this.commissionStatistics$ = this.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getCommissionStatistics(this.currentUser.id, this.currentUser.userType);
      },
      'Lỗi load dữ liệu thống kê hoa hồng'
    );
  }

  initTransaction(): void {
    this.transactionHistory$ = this.createPaginatedObservable(
      (page, pageSize) => this.userControlService.getTransactionHistory(this.currentUser.id, this.currentUser.userType),
      'Lỗi load dữ liệu thống kê giao dịch'
    );
  }

  initWithdrawal(): void {
    this.withdrawalHistory$ = this.createPaginatedObservable(
      (page, pageSize) => this.userControlService.getWithdrawalHistory(this.currentUser.id, this.currentUser.userType),
      'Lỗi load dữ liệu rút tiền'
    );
  }

  initAccountBalance():void {
    this.accountBalance$ = this.userControlService.getAccountBalance(this.currentUser.id, this.currentUser.userType)
      .pipe(
        map(value => {
          if (!value.success) {
            throw new Error(value.errorMessages);
          }
          const {
            accountBalance,
            bankAccountNumber,
            bankAccountName,
            bankAccountBranch,
            bankAccountOwner
          } = value.data;

          return {
            accountBalance,
            bankAccountNumber,
            bankAccountName,
            bankAccountBranch,
            bankAccountOwner
          };
        }),
        catchError(err => {
          this.message.error(err.message || 'Lỗi lấy thông tin tài khoản');
          return of(null);
        })
      )
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  protected readonly COL_DATA_TYPE = COL_DATA_TYPE;
}
