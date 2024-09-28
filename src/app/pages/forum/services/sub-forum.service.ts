import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubForum} from "../models/SubForum";

@Injectable({
  providedIn: 'root'
})
export class SubForumService {

  constructor(
    private http: HttpClient,
  ) { }

  getListSubForum(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('SubCommunity', {params: option});
  }

  getSubForumDetail(id: number): Observable<any>{
    return this.http.get('SubCommunity/' + id);
  }

  createSubForum(data: SubForum): Observable<any>{
    return this.http.post('SubCommunity', data);
  }

  updateSubForum(data: SubForum): Observable<any>{
    return this.http.put('SubCommunity', data);
  }

  softDeleteSubForum(data: number[]): Observable<any> {
    return this.http.delete('SubCommunity/soft-delete',{body: data})
  }
}
