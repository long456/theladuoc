import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../layouts/auth-layout/auth/services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  signOut() {
    this.loginService.logOut()
    this.router.navigate(['auth']);
  }

  editProfile() {
    this.router.navigate(['page/profile']);
  }
}
