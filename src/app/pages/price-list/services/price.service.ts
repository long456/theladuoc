import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Price} from "../models/Price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(
    private http: HttpClient,
  ) { }

  getPriceList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('PriceList', {params: option});
  }

  getPriceDetail(id: number): Observable<any>{
    return this.http.get('PriceList/' + id);
  }

  createPrice(data: Price): Observable<any>{
    return this.http.post('PriceList', data);
  }

  updatePrice(data: Price): Observable<any>{
    return this.http.put('PriceList', data);
  }

  softDeletePrice(data: number[]): Observable<any> {
    return this.http.delete('Pricelist/soft-delete',{body: data})
  }
}
