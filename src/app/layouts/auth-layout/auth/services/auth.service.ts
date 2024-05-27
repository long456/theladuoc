import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserData, UserPasswordData} from "../models/user-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
  ) { }

  setUserData(data: UserData) :void {
    this.userData.next(data);
  }

  getUserData(): UserData {
    return this.userData.value;
  }

  clearUserData(): void {
    this.userData.next(null);
  }

  isAuthor(permission: string): boolean {
    const userDataPermission = this.getUserData().permissions;

    if (userDataPermission.includes(permission)) {
      return true;
    }
    return false;
  }

  getUserProfile(): Observable<any> {
    return this.http.get('User/profile')
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.post('User/update-profile', data)
  }

  updateUserPassword(data: UserPasswordData): Observable<any> {
    return this.http.post('User/update-password', data)
  }

  updateAvatar(data: any): Observable<any>{
    return this.http.post('User/update-avatar', data)
  }
}
