import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForumCategory} from "../models/ForumCategory";

@Injectable({
  providedIn: 'root'
})
export class ForumCategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getListForumCategory(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('CommunityCategory', {params: option});
  }

  getForumCategoryDetail(id: number): Observable<any>{
    return this.http.get('CommunityCategory/' + id);
  }

  createForumCategory(data: ForumCategory): Observable<any>{
    return this.http.post('CommunityCategory', data);
  }

  updateForumCategory(data: ForumCategory): Observable<any>{
    return this.http.put('CommunityCategory', data);
  }

  softDeleteForumCategory(data: number[]): Observable<any> {
    return this.http.delete('CommunityCategory/soft-delete',{body: data})
  }

  getAllForumCategory(): Observable<any>{
    return this.http.get('CommunityCategory/get-all-community-category');
  }
}
