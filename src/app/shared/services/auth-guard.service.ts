import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "../../layouts/auth-layout/auth/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    const { permission } = route.data

    if (!this.authService.isAuthor(permission)) {
      this.message.error('Bạn không có quyền sử dụng tính năng này')
      return false
    }

    if (!permission) {
      return true;
    }
    return true;
  }
}
