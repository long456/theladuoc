import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subscription,
} from "rxjs";
import {UserControlService} from "../../services/user-control.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserData} from "../../models/UserData";
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {PaginatedResponse} from "../../models/PaginatedResponse";

@Component({
  selector: 'app-financial-control',
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss']
})
export class FinancialControlComponent implements OnInit, OnDestroy {
  protected readonly COL_DATA_TYPE = COL_DATA_TYPE;
  private subscription: Subscription = new Subscription();
  currentUser!: UserData;
  currentSelection: number = 1;

  commissionStatistics$!: Observable<PaginatedResponse>;
  transactionHistory$!: Observable<PaginatedResponse>;
  withdrawalHistory$!: Observable<PaginatedResponse>;
  accountBalance$!: Observable<any>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  loading$ = new BehaviorSubject(false);

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

  initCommission(): void {
    this.commissionStatistics$ = this.userControlService.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getCommissionStatistics(page, pageSize);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
      'Lỗi load dữ liệu thống kê hoa hồng'
    );
  }

  initTransaction(): void {
    this.transactionHistory$ = this.userControlService.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getTransactionHistory(page, pageSize);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
      'Lỗi load dữ liệu thống kê giao dịch'
    );
  }

  initWithdrawal(): void {
    this.withdrawalHistory$ = this.userControlService.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getWithdrawalHistory(page, pageSize);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
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
          return of([]);
        })
      )
  }

  onSelect():void {
    this.page$.next(1);
    this.pageSize$.next(10);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
