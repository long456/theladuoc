import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(
    private http: HttpClient,
  ) { }

  getListLandingPage(page? : any, pageSize? : any): Observable<any>{
    const data = {
      PageIndex: page,
      PageSize: pageSize
    }
    return this.http.get('LandingPage', {params: data});
  }

  createLandingPage(data: any): Observable<any>{
    return this.http.post('LandingPage' , data)
  }

  getLandingPageById(id : number): Observable<any>{
    return this.http.get('LandingPage/' + id)
  }

  updateLandingPage(id: number, data: any): Observable<any>{
    return this.http.put('LandingPage/'+ id, data)
  }

  softDeleteLandingPage(data: any): Observable<any>{
    return this.http.delete('LandingPage/soft-delete' , {body: data})
  }

  attachForm(data: any, landingPageId: number): Observable<any>{
    return this.http.patch('LandingPage/update-form-register', data, {params: {landingPageId: landingPageId}})
  }
}
