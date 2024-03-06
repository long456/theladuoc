import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserData} from "../models/user-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

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
}
