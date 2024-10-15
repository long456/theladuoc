import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BusinessAccess} from "../models/BusinessAccess";

@Injectable({
  providedIn: 'root'
})
export class BusinessAccessService {

  constructor(
    private http: HttpClient,
  ) { }

  getListBusinessAccess(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Permission', {params: option});
  }

  getBusinessAccessDetail(id: number): Observable<any>{
    return this.http.get('Permission/' + id);
  }

  createBusinessAccess(data: BusinessAccess): Observable<any>{
    return this.http.post('Permission', data);
  }

  updateBusinessAccess(data: BusinessAccess): Observable<any>{
    return this.http.put('Permission', data);
  }
}
