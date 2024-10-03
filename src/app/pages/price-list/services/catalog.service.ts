import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Catalog} from "../models/Catalog";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient,
  ) { }

  getListCatalog(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('Catalog', {params: option});
  }

  getCatalogDetail(id: number): Observable<any>{
    return this.http.get('CommunityCategory/' + id);
  }

  createCatalog(data: Catalog): Observable<any>{
    return this.http.post('CommunityCategory', data);
  }

  updateCatalog(data: Catalog): Observable<any>{
    return this.http.put('CommunityCategory', data);
  }
}
