import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentWaitingService {

  constructor(
    private http: HttpClient,
  ) { }

  getWaitingStudent(filter? : any) {
    let data = {
      page: '1',
      pageSize: '10',
    }
    if (filter) {
      data = {
        ...filter,
        page: '1',
        pageSize: '10'
      }
    }

    return this.http.get('UserAffiliate/waiting',{params: data} )
  }

  takeCareStudent(id: number) {
    return this.http.post('UserAffiliate/receive-care-user-waiting', {id: id})
  }
}
