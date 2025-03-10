import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserData} from "../../models/UserData";
import {UserControlService} from "../../services/user-control.service";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {COL_DATA_TYPE} from "../../../../shared/models/Table";

@Component({
  selector: 'app-referral-account',
  templateUrl: './referral-account.component.html',
  styleUrls: ['./referral-account.component.scss']
})
export class ReferralAccountComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  currentUser: UserData | null = null;

  refAcc$!: Observable<PaginatedResponse>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filter$ = new BehaviorSubject(1);
  loading$ = new BehaviorSubject(false);

  constructor(
    private userControlService: UserControlService,
  ) {}

  ngOnInit():void {
    this.subscription = this.userControlService.data$.subscribe({
      next: data => {
        if (data) {
          this.currentUser = data;
          this.initRefAcc();
        }
      }
    });
  }

  initRefAcc():void {
    this.refAcc$ = this.userControlService.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getRefAcc(page, pageSize);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
      'Lỗi load dữ liệu tài khoản giới thiệu'
    );
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  protected readonly COL_DATA_TYPE = COL_DATA_TYPE;
}
