import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getListHeaderConfig(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('HeaderNavigation', {params: option});
  }

  getHeaderById(id: number): Observable<any>{
    return this.http.get('HeaderNavigation/'+ id);
  }

  createHeader(data: any): Observable<any>{
    return this.http.post('HeaderNavigation', data);
  }

  updateHeader(data: any, id: number): Observable<any>{
    return this.http.put('HeaderNavigation/'+ id, data);
  }

  softDeleteHeader(listId: number[]): Observable<any>{
    return this.http.delete('HeaderNavigation/soft-delete', {body: listId});
  }

  getAllHeader(): Observable<any>{
    return this.http.get('HeaderNavigation/get-all-header-navigation');
  }

}
