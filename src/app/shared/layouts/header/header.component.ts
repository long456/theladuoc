import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../layouts/auth-layout/auth/services/login.service";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../layouts/auth-layout/auth/services/auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {StudentService} from "../../../pages/student/services/student.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  private subscription: Subscription;
  linkAvatar!: string;
  userData!: any;
  downloadStatus!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private studentService: StudentService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const baseUrl = environment.baseImgUrl
    const dataUser = localStorage.getItem('data');
    if (dataUser) {
      const parseUserData = JSON.parse(dataUser);
      const avatarUrl = parseUserData.avatar;
      this.linkAvatar = baseUrl + avatarUrl;
      this.userData = parseUserData
    } else {
      this.authService.getUserProfile().subscribe({
        next: res => {
          if (res.success) {
            this.linkAvatar = baseUrl + res.data.avatar;
            this.userData = res.data;
          }
        }
      });
    }

    this.subscription = this.studentService.exportStatus$.subscribe((status) => {
      this.showMessage(status);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  showMessage(status: string) {
    switch (status) {
      case 'pending':
        this.downloadStatus = 'pending';
        this.createNotification('info', 'Quá trình download file excel đang chạy');
        break;
      case 'completed':
        this.downloadStatus = 'completed';
        this.createNotification('success', 'Download file thành công')
        break;
      case 'error':
        this.downloadStatus = 'error';
        this.createNotification('error', 'Có lỗi khi download file')
        break;
      default:
        this.downloadStatus = '';
    }
  }

  signOut() {
    this.loginService.logOut()
    this.router.navigate(['auth']);
  }

  editProfile() {
    this.router.navigate(['page/profile']);
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      'Export file excel',
      content
    );
  }
}
