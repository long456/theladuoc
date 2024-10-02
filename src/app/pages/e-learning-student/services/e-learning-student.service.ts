import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AgencyListComponent} from "../components/agency-list/agency-list.component";

@Injectable({
  providedIn: 'root'
})
export class ELearningStudentService {

  constructor(
    private http: HttpClient,
  ) { }

  getNoneDivideEStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('User/new-student-list', {params: option})
  }

  getWaitingEStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('User/waiting', {params: option})
  }

  getTakingCareEStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('User/taking-care', {params: option})
  }

  getStudyingEStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('User/studying', {params: option})
  }

  getRegisterEStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Order/list-order-course-elearning', {params: option})
  }

  getAgencyList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('User/list-agent-membership', {params: option})
  }

  receiveCareUser(idList: string): Observable<any>{
    return this.http.post('User/receive-care-user-waiting', {userIds: idList});
  }

  refuseCareUser(idList: string): Observable<any>{
    return this.http.post('User/not-receive-care-user-waiting', {userIds: idList});
  }

  getECourseToActive(): Observable<any>{
    return this.http.get('CourseElearning/get-list-option-elearning-to-active');
  }

  activeECourse(data: any): Observable<any>{
    return this.http.post('CourseElearning/active-elearning-to-student', data);
  }

  activeMembership(data: any): Observable<any>{
    return this.http.post('User/gift-membership', data);
  }

  addAgency(data: any): Observable<any>{
    return this.http.post('User/add-agent-membership', data);
  }

  disableAgency(id: number): Observable<any>{
    return this.http.get('User/disable-agent-membership');
  }
}
