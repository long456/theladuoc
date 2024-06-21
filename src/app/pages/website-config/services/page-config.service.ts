import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getListPageConfig(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('Page', {params: option});
  }

  getPageById(id: number): Observable<any>{
    return this.http.get('Page/'+ id);
  }

  createPage(data: any): Observable<any>{
    return this.http.post('Page', data);
  }

  updatePage(data: any, id: number): Observable<any>{
    return this.http.post('Page/'+ id, data);
  }

  softDeletePage(listId: number[]): Observable<any>{
    return this.http.delete('Page/soft-delete', {body: listId});
  }
}
