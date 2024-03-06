import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class StudyingStudentService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) { }

  getStudyingStudent(filter? : any) {
    let data = {
      page: '1',
      pageSize: '10'
    }

    return this.http.get('User/get-list-student', {params: data})
  }
}
