import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  delay,
  map,
  mergeMap,
  Observable,
  of,
  tap
} from "rxjs";
import {UserData} from "../models/UserData";
import {NzMessageService} from "ng-zorro-antd/message";

interface PaginatedResponse {
  rows: any[];
  page: number;
  pageSize: number;
  rowTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserControlService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
  ) { }

  private dataSubject = new BehaviorSubject<UserData | null>(null);

  public data$: Observable<UserData | null> = this.dataSubject.asObservable();

  setUserData(data: UserData): void {
    this.dataSubject.next(data);
  }

  getCurrentUser(): UserData | null {
    return this.dataSubject.value;
  }

  clearUserData(): void {
    this.dataSubject.next(null);
  }

  createPaginatedObservable(
    fetchMethod: (page?: number, pageSize?: number, filter?: any) => Observable<any>,
    page$: BehaviorSubject<number>,
    pageSize$: BehaviorSubject<number>,
    loading$: BehaviorSubject<boolean>,
    errorMessage: string,
    filter$?: BehaviorSubject<any>,
  ): Observable<PaginatedResponse> {
    return combineLatest([
      page$,
      pageSize$,
      filter$ || new BehaviorSubject<any>(null),
    ]).pipe(
      tap(() => {
        loading$.next(true);
      }),
      debounceTime(300),
      mergeMap(([page, pageSize, filter]) =>
        fetchMethod(page, pageSize,filter).pipe(
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
      tap(() => {
        loading$.next(false);
      })
    );
  }

  searchUser(str: string): Observable<any> {
    return this.http.get('GeneralControlPanel/get-list-search-user', {params: {SearchString: str}});
  }

  getUserInfo(id: number, type: number): Observable<any> {
    return this.http.get('GeneralControlPanel/get-personal-information', {params: {id: id, UserType: type}});
  }

  getCommissionStatistics(page?: any, pageSize?: any): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params = {
        id: userData.id,
        UserType: userData.userType,
        PageIndex: page,
        pageSize: pageSize
      };
      return this.http.get('GeneralControlPanel/get-page-list-commission-statistics', {params});
    }
  }

  getTransactionHistory(page?: any, pageSize?: any): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params = {
        id: userData.id,
        UserType: userData.userType,
        PageIndex: page,
        pageSize: pageSize
      };
      return this.http.get('GeneralControlPanel/get-page-list-transaction-history', {params});
    }
  }

  getWithdrawalHistory(page?: any, pageSize?: any): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params = {
        id: userData.id,
        UserType: userData.userType,
        PageIndex: page,
        pageSize: pageSize
      };
      return this.http.get('GeneralControlPanel/get-page-list-cashflow-history', {params});
    }
  }

  getAccountBalance(id: number, type: number): Observable<any> {
    return this.http.get('GeneralControlPanel/get-account-balance', {params: {id: id, UserType: type}});
  }

  getFunnelCourse(page?: any, pageSize?: any, courseType?: number,): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params = {
        id: userData.id,
        UserType: userData.userType,
        FunnelCourseType: courseType || 1,
        PageIndex: page,
        pageSize: pageSize
      };
      return this.http.get('GeneralControlPanel/get-page-list-funnel-course', {params});
    }
  }

  getELearningCourse(page?: any, pageSize?: any,): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params = {
        id: userData.id,
        UserType: userData.userType,
        PageIndex: page,
        pageSize: pageSize
      };
      return this.http.get('GeneralControlPanel/get-page-list-course-elearning', {params});
    }
  }

  getRefAcc(page?: any, pageSize?: any, filter?: any): Observable<any> {
    const userData = this.getCurrentUser();
    if (!userData) {
      throw new Error('User data is required');
    } else {
      const params =
        filter?
          {
            id: userData.id,
            UserType: userData.userType,
            PageIndex: page,
            pageSize: pageSize
          }
          : {
            id: userData.id,
            UserType: userData.userType,
            PageIndex: page,
            pageSize: pageSize,
            ...filter
          }
      return this.http.get('GeneralControlPanel/get-page-list-referral-account  ', {params});
    }
  }
}
