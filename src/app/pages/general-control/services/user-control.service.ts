import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserData} from "../models/UserData";

@Injectable({
  providedIn: 'root'
})
export class UserControlService {

  constructor(
    private http: HttpClient,
  ) { }

  private dataSubject = new BehaviorSubject<UserData | null>(null);

  public data$: Observable<UserData | null> = this.dataSubject.asObservable();

  setUserData(data: UserData): void {
    this.dataSubject.next(data);
  }

  getCurrentUser(): UserData | null {
    return this.dataSubject.value;
  }

  clearUserData(): void {
    this.dataSubject.next(null);
  }

  searchUser(str: string): Observable<any> {
    return this.http.get('GeneralControlPanel/get-list-search-user', {params: {SearchString: str}});
  }

  getUserInfo(id: number, type: number): Observable<any> {
    return this.http.get('GeneralControlPanel/get-personal-information', {params: {id: id, UserType: type}});
  }
}
