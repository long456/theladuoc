import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../layouts/auth-layout/auth/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredPermission = route.data['requiredPermission'];
    if (requiredPermission) {
      if (!this.authService.isAuthor(requiredPermission)) {
        this.message.error('Bạn không có quyền để truy cập chức năng này!')
      }
      return this.authService.isAuthor(requiredPermission);
    }
    return true;
  }
}
