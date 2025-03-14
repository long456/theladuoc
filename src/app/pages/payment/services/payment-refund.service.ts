import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentRefundService {

  constructor(
    private http: HttpClient,
  ) { }

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
    return this.http.get('PaymentRefund', {params: option})
  }

  verifyRefund(data: any): Observable<any> {
    return this.http.post('PaymentRefund/verify', data);
  }

  getListImgRefund(id: number): Observable<any>{
    return this.http.get('PaymentRefund/get-list-image/' + id);
  }

}
