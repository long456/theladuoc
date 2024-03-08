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

  getAllForm(): Observable<any>{
    return this.http.get('FormRegister')
  }
}
