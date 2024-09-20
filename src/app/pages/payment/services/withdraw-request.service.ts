import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WithdrawRequestService {

  constructor(
    private http: HttpClient,
  ) {}

  getListRefund(page?: any, pageSize?: any, filter?: any): Observable<any>{
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    if (filter) {
      option = {
        ...filter,
        PageIndex: page,
        pageSize: pageSize,
      }
    }
    return this.http.get('DataUser/list-withdraw-money', {params: option})
  }

  activeWithdraw(id: number): Observable<any>{
    return this.http.get('DataUser/active-withdraw-money/' + id);
  }

  cancelWithdraw(id: number): Observable<any>{
    return this.http.get('DataUser/cancel-withdraw-money/' + id);
  }
}