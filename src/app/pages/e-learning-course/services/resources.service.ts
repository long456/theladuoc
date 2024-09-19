import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private http: HttpClient,
  ) { }

  getResourcesList(courseId: number, page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Resource/' + courseId, {params: option});
  }

  getResourcesById(id: number): Observable<any>{
    return this.http.get('Resource/detail/' + id);
  }

  createResources(data: any): Observable<any>{
    return this.http.post('Resource/create', data);
  }

  updateResources(data: any): Observable<any>{
    return this.http.post('Resource/update', data);
  }

  softDeleteResources(listId: number[]): Observable<any>{
    return this.http.delete('Resource/soft-delete', {body: listId})
  }
}
