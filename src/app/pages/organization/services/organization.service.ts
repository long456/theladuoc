import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllOrganization(): Observable<any>{
    return this.http.get('Organization')
  }

  getOrganizationById(id: number): Observable<any>{
    return this.http.get('Organization/' + id)
  }

  createOrganization(data: any): Observable<any> {
    return this.http.post('Organization' , data)
  }

  updateOrganization(data: any): Observable<any> {
    return this.http.post('Organization/update', data)
  }

  getPermissionOrganizationById(id : number) : Observable<any>{
    return this.http.get('Organization/permission/' + id)
  }

  updatePermissionOrganization(data: any): Observable<any>{
    return  this.http.post('Organization/update-permission', data)
  }
}
