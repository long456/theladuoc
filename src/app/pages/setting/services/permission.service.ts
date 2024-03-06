import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllPermission(): Observable<any>{
    return this.http.get('Role/pemissions' )
  }

  getAllRole(): Observable<any>{
    return this.http.get('Role')
  }

  getRoleById(id: any): Observable<any>{
    return this.http.get('Role/' + id)
  }

  createRole(data: any): Observable<any> {
    return this.http.post('Role', data)
  }

  updateRole(id: number, data: any): Observable<any> {
    return this.http.put('Role/' + id , data)
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete('Role/' + id)
  }
}
