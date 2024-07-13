import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private http: HttpClient,
  ) { }

  getListLesson(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Lesson', {params: option})
  }

  softDeleteLesson(list: number[]): Observable<any> {
    return this.http.delete('Lesson/soft-delete', {body: list})
  }

  createLesson(data: any): Observable<any>{
    return this.http.post('Lesson', data)
  }

  updateLesson(id: number, data: any): Observable<any>{
    return this.http.put('Lesson/'+ id, data)
  }

  getAllLesson(courseId: number): Observable<any>{
    return this.http.get('Lesson/get-all-lesson?courseId=' + courseId);
  }
}
