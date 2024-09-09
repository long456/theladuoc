import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Withdraw} from "../models/Withdraw";

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  constructor(
    private http: HttpClient,
  ) {}

  getWithdrawConfig(): Observable<any>{
    return this.http.get('Organization/detail-withdraw-money');
  }

  updateWithdrawConfig(data: Withdraw): Observable<any>{
    return this.http.post('Organization/update-withdraw-money', data);
  }
}
