import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ELearningServicesService {

  constructor(
    private http: HttpClient,
  ) { }

  getCategoryList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('CategoryElearning', {params: option});
  }

  getCategoryById(id: number): Observable<any>{
    return this.http.get('CategoryElearning/detail/' + id);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post('CategoryElearning/create', data)
  }

  updateCategory(data: any): Observable<any>{
    return this.http.post('CategoryElearning/update', data);
  }

  softDeleteCategory(list: number[]): Observable<any>{
    return this.http.delete('CategoryElearning/soft-delete', {body: list});
  }
}
