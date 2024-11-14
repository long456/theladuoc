import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {GeneralConfig} from "../models/GeneralConfig";
import {HomePageConfig} from "../models/HomePage-Config";
import {AboutUsConfig} from "../models/AboutUSConfig";

@Injectable({
  providedIn: 'root'
})
export class ELearningConfigService {

  constructor(
    private http: HttpClient,
  ) { }

  getConfigList(page?: any, pageSize?: any, filter?: any): Observable<any> {
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

    return this.http.get('ConfigElearningWeb/list-config-elearning-web', { params: option });
  }

  getGeneralConfig(): Observable<any> {
    return this.http.get('ConfigElearningWeb/detail-config-general');
  }

  updateGeneralConfig(data: GeneralConfig): Observable<any> {
    return this.http.post('ConfigElearningWeb/config-general', data)
  }

  getHomeConfig(): Observable<any> {
    return this.http.get('ConfigElearningWeb/detail-config-view-home');
  }

  updateHomeConfig(data : HomePageConfig): Observable<any> {
    return this.http.post('ConfigElearningWeb/config-view-home', data);
  }

  getAboutUsConfig(): Observable<any> {
    return this.http.get('ConfigElearningWeb/detail-config-view-about-us');
  }

  updateAboutUsConfig(data: AboutUsConfig): Observable<any> {
    return this.http.post('ConfigElearningWeb/config-view-about-us', data);
  }
}
