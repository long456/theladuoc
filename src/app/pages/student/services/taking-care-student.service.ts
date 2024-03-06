import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class TakingCareStudentService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) { }

  getTakingCareStudent(filter? : any) {
    let data = {
      page: '1',
      pageSize: '10'
    }

    return this.http.get('UserAffiliate/taking-care', {params: data})
  }
}
