import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
  ) { }


  getCustomerList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Customer', {params: option});
  }

  createCustomer(data: any): Observable<any>{
    return this.http.post('Customer/create-new-customer', data);
  }

  getCustomerByCode(code: string): Observable<any>{
    return this.http.get('Customer/' + code);
  }

  updateCustomer(data: any, code: string): Observable<any>{
    return this.http.put('Customer/update-customer',{data}, {params: {customerCode: code}});
  }
}
