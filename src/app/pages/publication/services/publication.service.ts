import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private http: HttpClient,
  ) { }

  getListPublications(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Publication', {params: option})
  }

  createPublication(data: any): Observable<any>{
    return this.http.post('Publication/upload-publication', data);
  }

  softDeletePublication(data: number[]): Observable<any>{
    return this.http.delete('Publication/soft-delete', {body: data})
  }

  getPublicationById(id: number): Observable<any>{
    return this.http.get('Publication/' + id);
  }

  updatePublication(data: any): Observable<any>{
    return this.http.put('Publication/update-publication', data);
  }
}
