import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllForm(page? : any, pageSize? : any): Observable<any>{
    const data = {
      PageIndex: page,
      PageSize: pageSize
    }
    return this.http.get('FormRegister', {params: data});
  }

  getAllFormByCourse(courseId: number): Observable<any>{
    return this.http.get('FormRegister/get-list-form-register-by-course/' + courseId)
  }

  createForm(data: any): Observable<any> {
    return this.http.post('FormRegister', data);
  }

  softDeleteTicket(data: number[]): Observable<any> {
    return this.http.delete('FormRegister/soft-delete',{body: data})
  }

  getFormDataById(id: number): Observable<any> {
    return this.http.get('FormRegister/' + id)
  }

  updateFormDataById(id: number, data: any): Observable<any>{
    return this.http.put('FormRegister/' + id, data)
  }

  attachTicket(data: any): Observable<any>{
    return this.http.patch('FormRegister/add-ticket', null, {params: data})
  }

  removeAttachTicket(data: any): Observable<any>{
    return this.http.patch('FormRegister/remove-ticket', null, {params: data})
  }

}
