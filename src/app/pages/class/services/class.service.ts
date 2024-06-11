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

  getClassList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

  getClassByCourse(courseId: number): Observable<any>{
    return this.http.get('Class/list-by-course/' , {params: {courseId: courseId}})
  }

  attachLandingPage(data: any): Observable<any>{
    return this.http.patch('Class/add-landing-page', null, {params: data})
  }

  removeLandingPage(data: any): Observable<any>{
    return this.http.patch('Class/remove-landing-page', null, {params: data})
  }
}
