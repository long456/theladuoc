import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private http: HttpClient,
  ) { }

  getListCoupon(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Coupon', {params: option});
  }

  createCoupon(data: any): Observable<any>{
    return this.http.post('Coupon/create', data);
  }

  getCouponById(id: number): Observable<any>{
    return this.http.get('Coupon/detail/' + id);
  }

  updateCoupon(data: any, id: number): Observable<any>{
    return this.http.put('Coupon/' + id, data);
  }

  softDeleteCoupon(data: number[]): Observable<any> {
    return this.http.delete('Coupon/soft-delete',{body: data})
  }
}
