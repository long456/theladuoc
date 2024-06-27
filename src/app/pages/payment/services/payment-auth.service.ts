import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentAuthService {

  constructor(
    private http: HttpClient,
  ) { }

  getListPayment(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('PaymentHistory/get-list', {params: option})
  }

  updatePayment(data: any): Observable<any>{
    return this.http.post('PaymentHistory/update-verify-pay', data);
  }
}
