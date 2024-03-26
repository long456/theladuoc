import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getListConfig(page?: any, pageSize?: any, filter?: any): Observable<any>{
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
    return this.http.get('Website', {params: option});
  }

  updateWebConfig(data: any, id: number): Observable<any>{
    return this.http.put('Website/' + id, data);
  }

  getWebConfigById(id: number): Observable<any>{
    return this.http.get('Website/' + id)
  }
}
