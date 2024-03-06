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

  getAllCourse(filter?: any): Observable<any>{
    let option = {
      pageCurent: 1,
      pageSize: 10,
    }

    if (filter) {
      option = {
        ...filter,
        pageCurent: 1,
        pageSize: 10,
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

  deleteCourse(id : number): Observable<any>{
    return this.http.delete('Course/' + id)
  }

  getAllTeacher(): Observable<any>{
    return this.http.get('User/get-list-option-lecturer')
  }
}
