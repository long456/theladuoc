import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForumNav} from "../models/ForumNav";

@Injectable({
  providedIn: 'root'
})
export class ForumNavigationService {

  constructor(
    private http: HttpClient,
  ) { }

  getListForumNav(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('CommunityNavigation', {params: option});
  }

  getForumNavDetail(id: number): Observable<any>{
    return this.http.get('CommunityNavigation/' + id);
  }

  createForumNav(data: ForumNav): Observable<any>{
    return this.http.post('CommunityNavigation', data);
  }

  updateForumNav(data: ForumNav): Observable<any>{
    return this.http.put('CommunityNavigation', data);
  }

  softDeleteForumNav(data: number[]): Observable<any> {
    return this.http.delete('CommunityNavigation/soft-delete',{body: data})
  }
}
