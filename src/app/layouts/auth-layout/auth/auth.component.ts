import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./services/login.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  active = false;

  loginForm!: FormGroup;

  isSubmit = false;

  titleCms!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    const dataOrg = localStorage.getItem('org');
    if (dataOrg) {
      const title = JSON.parse(dataOrg).name;
      this.titleCms = title;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.isSubmit = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email.trim(), this.loginForm.value.password.trim()).subscribe(res => {
        if (res.success === true) {
          this.addTokenKey(res.token);
          this.addUserData(JSON.stringify(res.data));
          this.authService.setUserData(res.data);
          this.router.navigate(['page']);
        } else {
          this.message.error(res.errorMessages)
        }
      })
    }
  }

  addTokenKey(token: string) {
    localStorage.setItem('tokenKey', token);
  }

  addUserData(data: string): void{
    localStorage.setItem('data', data);
  }

  changeActive() {
    this.active = !this.active;
  }

  forgotPassword() {

  }
}
