import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ECourseService {

  constructor(
    private http: HttpClient,
  ) { }

  getECourseList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('CourseElearning', {params: option});
  }

  getCourseById(id: number): Observable<any>{
    return this.http.get('CourseElearning/detail/' + id)
  }

  updateCourse(data: any): Observable<any>{
    return this.http.post('CourseElearning/update', data)
  }

  createCourse(data: any): Observable<any> {
    return this.http.post('CourseElearning/create', data)
  }

  deleteCourse(id : [number]): Observable<any>{
    return this.http.delete('CourseElearning/' + id)
  }

  softDeleteCourse(data: number[]): Observable<any> {
    return this.http.delete('CourseElearning/soft-delete',{body: data})
  }
}
