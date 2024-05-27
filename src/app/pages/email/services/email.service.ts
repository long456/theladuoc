import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient,
  ) { }

  getListSystemEmail(page?: any, pageSize?: any, filter?: any): Observable<any>{
    let option = {
      PageIndex: page,
      pageSize: pageSize,
      type: 1,
    }

    if (filter) {
      option = {
        ...filter,
        PageIndex: page,
        pageSize: pageSize,
      }
    }

    return this.http.get('EmailTemplate', {params: option})
  }

  getListNotificationsEmail(page?: any, pageSize?: any, filter?: any): Observable<any>{
    let option = {
      PageIndex: page,
      pageSize: pageSize,
      type: 2,
    }

    if (filter) {
      option = {
        ...filter,
        PageIndex: page,
        pageSize: pageSize,
      }
    }

    return this.http.get('EmailTemplate', {params: option})
  }

  softDeleteNotificationsEmail(data: number[]): Observable<any> {
    return this.http.delete('EmailTemplate/soft-delete',{body: data})
  }

  getEmailById(id: number): Observable<any> {
    return this.http.get('EmailTemplate/' + id)
  }

  updateEmail(data: any, id: number): Observable<any>{
    return this.http.put('EmailTemplate/' + id, data)
  }

  createEmail(data: any): Observable<any>{
    return this.http.post('EmailTemplate', data)
  }

  getNotificationsEmailById(id: number): Observable<any> {
    return this.http.get('EmailTemplate/' + id)
  }

  createNotificationsEmail(data: any): Observable<any>{
    return this.http.post('EmailTemplate', data)
  }

  updateNotificationsEmail(data: any, id: number): Observable<any>{
    return this.http.put('EmailTemplate/' + id, data)
  }

}
