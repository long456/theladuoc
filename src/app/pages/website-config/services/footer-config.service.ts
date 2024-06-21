import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FooterConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getListFooterConfig(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('FooterNavigation', {params: option});
  }

  getFooterById(id: number): Observable<any>{
    return this.http.get('FooterNavigation/'+ id);
  }

  createFooter(data: any): Observable<any>{
    return this.http.post('FooterNavigation', data);
  }

  updateFooter(data: any, id: number): Observable<any>{
    return this.http.post('FooterNavigation/'+ id, data);
  }

  softDeleteFooter(listId: number[]): Observable<any>{
    return this.http.delete('FooterNavigation/soft-delete', {body: listId});
  }
}
