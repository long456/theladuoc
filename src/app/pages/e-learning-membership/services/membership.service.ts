import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(
    private http: HttpClient,
  ) { }

  getMembershipList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('MemberPolicyLevel', {params: option});
  }

  getMembershipById(id: number): Observable<any>{
    return this.http.get('MemberPolicyLevel/' + id);
  }

  createMembership(data: any): Observable<any> {
    return this.http.post('MemberPolicyLevel/create', data)
  }

  updateMembership(data: any): Observable<any> {
    return this.http.post('MemberPolicyLevel/update', data)
  }

  softDeleteMembership(id: number): Observable<any>{
    return this.http.delete('MemberPolicyLevel/soft-delete/' + id);
  }
}