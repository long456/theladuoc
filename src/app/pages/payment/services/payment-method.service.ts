import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(
    private http: HttpClient,
  ) { }

  getMethodList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('ManagementPaymentMethod', {params: option});
  }

  getMethodById(id: number): Observable<any>{
    return this.http.get('ManagementPaymentMethod/' + id);
  }

  createMethod(data: any): Observable<any>{
    return this.http.post('ManagementPaymentMethod/create', data);
  }

  updateMethod(data: any): Observable<any>{
    return this.http.post('ManagementPaymentMethod/update', data);
  }

  softDeleteMethod(listId: number[]): Observable<any>{
    return this.http.delete('ManagementPaymentMethod/soft-delete', {body: listId});
  }
}
