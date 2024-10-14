import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BenefitGroup} from "../models/BenefitGroup";


@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  constructor(
    private http: HttpClient,
  ) { }

  getListBenefitGroup(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('GroupBenefit', {params: option});
  }

  getBenefitGroupDetail(id: number): Observable<any>{
    return this.http.get('GroupBenefit/' + id);
  }

  createBenefitGroup(data: BenefitGroup): Observable<any>{
    return this.http.post('GroupBenefit', data);
  }

  updateBenefitGroup(data: BenefitGroup): Observable<any>{
    return this.http.put('GroupBenefit', data);
  }
}
