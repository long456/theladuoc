import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private http: HttpClient,
  ) { }

  getListStaff(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('User/list-staff', {params: option})
  }

  getUserType(): Observable<any>{
    return this.http.get('User/get-list-user-type')
  }

  createUser(data: any): Observable<any>{
    return this.http.post('User', data)
  }

  updateUser(data: any): Observable<any>{
    return this.http.post('User/update-user', data)
  }

  getDetailStaff(id: number): Observable<any>{
    return this.http.get('User/detail-student/' + id)
  }
}
