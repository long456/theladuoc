import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ELearningConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getConfigList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('ConfigElearningWeb/list-config-elearning-web', { params: option });
  }

  configureGeneral(): Observable<any> {
    return this.http.get('ConfigElearningWeb/config-general');
  }

  configureHome(data: any): Observable<any> {
    return this.http.post('ConfigElearningWeb/config-view-home', data);
  }
}
