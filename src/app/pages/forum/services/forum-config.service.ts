import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForumConfig} from "../models/ForumConfig";

@Injectable({
  providedIn: 'root'
})
export class ForumConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getListForumConfig(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Community', {params: option});
  }

  getForumConfigDetail(id: number): Observable<any>{
    return this.http.get('Community/' + id);
  }

  createForumConfig(data: ForumConfig): Observable<any>{
    return this.http.post('Community', data);
  }

  updateForumConfig(data: ForumConfig): Observable<any>{
    return this.http.put('Community', data);
  }

  softDeleteForumConfig(data: number[]): Observable<any> {
    return this.http.delete('Community/soft-delete',{body: data})
  }
}
