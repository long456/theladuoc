import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {

  constructor(
    private http: HttpClient,
  ) { }

  getListLoyalty(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Loyalty/get-list-loyalty', {params: option})
  }

  getLoyaltyByCode(code: string): Observable<any>{
    return this.http.get('Loyalty/get-loyalty-detail/' + code);
  }

  createLoyalty(data: any): Observable<any>{
    return this.http.post('Loyalty/create-loyalty', data);
  }

  updateLoyalty(data: any, code: string): Observable<any>{
    return this.http.put('Loyalty/update-loyalty/' + code, data);
  }
}
