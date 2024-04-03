import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient,
  ) { }

  getAttendanceList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Class', {params: option})
  }

  createClass(data: any): Observable<any> {
    return this.http.post('Class', data)
  }

  getClassById(id: number): Observable<any> {
    return this.http.get('Class/' + id)
  }

  updateClass(id: number, data: any): Observable<any> {
    return this.http.put('Class/' + id, data)
  }

  softDeleteClass(list: number[]): Observable<any> {
    return this.http.delete('Class/soft-delete', {body: list})
  }
}
