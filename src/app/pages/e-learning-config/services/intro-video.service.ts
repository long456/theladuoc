import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IntroVideoService {

  constructor(
    private http: HttpClient,
  ) { }

  getIntroVideoList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Organization/get-list-video-intro', {params: option});
  }

  introVideoDetail(): Observable<any>{
    return this.http.get('Organization/detail-config-video-intro');
  }

  updateConfigVideoIntro(data: any): Observable<any>{
    return this.http.post('Organization/config-video-intro', data);
  }
}
