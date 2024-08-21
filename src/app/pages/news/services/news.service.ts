import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
  ) { }

  getNewsList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Article', {params: option});
  }

  getNewsById(id: number): Observable<any>{
    return this.http.get('Article/' + id);
  }

  createNews(data: any): Observable<any>{
    return this.http.post('Article', data);
  }

  updateNews(data: any): Observable<any>{
    return this.http.put('Article', data);
  }

  softDeleteNews(listId: number[]): Observable<any>{
    return this.http.delete('Article/soft-delete', {body: listId});
  }
}
