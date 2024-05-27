import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private exportStatusSource = new Subject<string>();
  exportStatus$ = this.exportStatusSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  updateExportStatus(status: string) {
    this.exportStatusSource.next(status);
  }

  setStudentData(data: any) {
    this.studentData.next(data);
  }

  getStudentData() {
    return this.studentData.value
  }

  getNoneDivideStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('UserAffiliate/new-student-list', {params: option})
  }

  getWaitingStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('UserAffiliate/waiting', {params: option})
  }

  getTakeCareStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('UserAffiliate/taking-care', {params: option})
  }

  getStudyingStudent(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('UserAffiliate/studying', {params: option})
  }

  takeCareStudent(list: string): Observable<any>{
    return this.http.post('UserAffiliate/receive-care-user-waiting', {userAffIds : list})
  }

  rejectStudent(list: string): Observable<any>{
    return this.http.post('UserAffiliate/not-receive-care-user-waiting', {userAffIds : list})
  }

  setPaymentCheck(data: any): Observable<any>{
    return this.http.post('UserAffiliate/update-payment-status', data)
  }

  updateTag(data: any): Observable<any>{
    return this.http.post('UserAffiliate/update-sale-note', data)
  }

  upgradeCourseUser(data: any): Observable<any>{
    return this.http.post('UserAffiliate/upgrade-course-for-user-aff', data)
  }

  exportExcel(data: any): Observable<any>{
    const dataExport = {
      ...data,
      pageIndex: 1,
      pageSize: 10,
    }
    return this.http.get('UserAffiliate/export',{params: dataExport})
  }
}
