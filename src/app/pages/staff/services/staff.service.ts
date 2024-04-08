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
      PageIndex: page = 1,
      pageSize: pageSize = 10,
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
}
