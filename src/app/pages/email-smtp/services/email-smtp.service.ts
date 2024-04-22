import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailSmtpService {

  constructor(
    private http: HttpClient,
  ) { }

  getListEmailAccount(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('EmailAccount', {params: option})
  }

  // createEmailAccount(): Observable<any> {
  //   return this.http.post()
  // }

  softDeleteEmailAccount(id: number): Observable<any>{
    return this.http.delete('EmailAccount/' + id)
  }
}
