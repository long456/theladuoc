import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCourse(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('Course', {params: option})
  }

  getCourseById(id: number): Observable<any>{
    return this.http.get('Course/' + id)
  }

  updateCourse(id: number, data: any): Observable<any>{
    return this.http.put('Course/' +id , data)
  }

  createCourse(data: any): Observable<any> {
    return this.http.post('Course', data)
  }

  deleteCourse(id : [number]): Observable<any>{
    return this.http.delete('Course/' + id)
  }

  softDeleteCourse(data: number[]): Observable<any> {
    return this.http.delete('Course/soft-delete',{body: data})
  }

  getAllTeacher(): Observable<any>{
    return this.http.get('User/get-list-option-lecturer')
  }

  getListCourse(): Observable<any>{
    return this.http.get('Course/get-course-list')
  }
}
