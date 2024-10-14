import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserData, UserPasswordData} from "../models/user-data";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
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
    const userDataPermission = this.getUserData()?.permissions;
    if (!userDataPermission || userDataPermission.length === 0) {
      this.router.navigate(['auth']).then();
      return false;
    }

    if (userDataPermission.includes(permission)) {
      return true;
    }
    return false;
  }

  getUserProfile(): Observable<any> {
    return this.http.get('User/profile');
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.post('User/update-profile', data);
  }

  updateUserPassword(data: UserPasswordData): Observable<any> {
    return this.http.post('User/update-password', data)
  }

  updateAvatar(data: any): Observable<any>{
    return this.http.post('User/update-avatar', data);
  }

  updateProfileTeacher(data: any): Observable<any>{
    return this.http.post('User/update-profile-teacher', data);
  }

  getProfileTeacher(): Observable<any>{
    return this.http.get('User/get-detail-profile-teacher');
  }

  isSuperAdmin():boolean {
    const data = this.getUserData();
    if (data && data.id === 1) {
      return true;
    }
    return false;
  }
}
