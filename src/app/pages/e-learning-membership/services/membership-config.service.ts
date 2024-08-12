import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembershipConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getMembershipConfigList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('MemberPolicyLevel/list-config-member-policy', {params: option});
  }

  getDetailMembershipConfig(): Observable<any>{
    return this.http.get('MemberPolicyLevel/detail-config-member-policy');
  }

  updateMembershipConfig(data: any): Observable<any>{
    return this.http.post('MemberPolicyLevel/config-member-policy', data);
  }
}
