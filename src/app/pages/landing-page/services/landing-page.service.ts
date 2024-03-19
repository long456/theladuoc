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
}
