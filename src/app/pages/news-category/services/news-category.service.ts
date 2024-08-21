import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsCategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getNewsCategoryList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Category', {params: option});
  }

  getNewsCategoryById(id: number): Observable<any>{
    return this.http.get('Category/' + id);
  }

  createNewsCategory(data: any): Observable<any>{
    return this.http.post('Category', data);
  }

  updateNewsCategory(data: any): Observable<any>{
    return this.http.put('Category', data);
  }

  softDeleteNewsCategory(listId: number[]): Observable<any>{
    return this.http.delete('Category/soft-delete', {body: listId});
  }

  getAllCategory(): Observable<any>{
    return this.http.get('Category/get-list-category');
  }
}
