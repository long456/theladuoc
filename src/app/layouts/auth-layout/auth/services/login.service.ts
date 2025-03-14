import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('login/cms', {"email": email, "password": password});
  }

  logOut(): Observable<void> {
    localStorage.clear();
    return this.http.get<void>('User/logout-cms')
  }
}
