import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
  ) { }

  getVideoList(courseId: number, page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Video/' + courseId, {params: option});
  }

  getVideoById(id: number): Observable<any>{
    return this.http.get('Video/detail/' + id);
  }

  createVideo(data: any): Observable<any>{
    return this.http.post('Video/create', data);
  }

  updateVideo(data: any): Observable<any>{
    return this.http.post('Video/update', data);
  }

  softDeleteVideo(listId: number[]): Observable<any>{
    return this.http.delete('Video/soft-delete', {body: listId})
  }
}
