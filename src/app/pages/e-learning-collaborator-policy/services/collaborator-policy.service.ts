import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollaboratorPolicyService {

  constructor(
    private http: HttpClient,
  ) { }

  getCollaboratorPolicyList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

  getCollaboratorPolicyById(id: number): Observable<any>{
    return this.http.get('MemberPolicyLevel/' + id);
  }

  createCollaboratorPolicy(data: any): Observable<any> {
    return this.http.post('MemberPolicyLevel/create', data)
  }

  updateCollaboratorPolicy(data: any): Observable<any> {
    return this.http.post('MemberPolicyLevel/update', data)
  }

  softDeleteCollaboratorPolicy(id: number): Observable<any>{
    return this.http.delete('MemberPolicyLevel/soft-delete/' + id);
  }
}
