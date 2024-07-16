import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(
    private http: HttpClient,
  ) { }

  getChapterList(courseId: number, page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Chapter/' + courseId, {params: option});
  }

  getChapterById(id: number): Observable<any>{
    return this.http.get('Chapter/detail/' + id);
  }

  getChapterByCourse(courseId: number): Observable<any>{
    return this.http.get('Chapter/get-list-chapter-by-elearning/' + courseId);
  }

  createChapter(data: any): Observable<any>{
    return this.http.post('Chapter/create', data);
  }

  updateChapter(data: any): Observable<any>{
    return this.http.post('Chapter/update', data);
  }

  softDeleteChapter(listId: number[]): Observable<any>{
    return this.http.delete('Chapter/soft-delete', {body: listId})
  }
}
