import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, finalize, of, Subject, switchMap, tap} from "rxjs";
import {UserControlService} from "../../services/user-control.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NavigationExtras, Router} from "@angular/router";
import {UserData} from "../../models/UserData";

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit{
  searchSubject = new Subject<string>();
  isLoading: boolean = false;
  listUser : UserData[] = [];
  userData!: UserData;
  currentTab: string = "info";
  tabs = [
    { key: 'info', title: 'Thông tin học viên' },
    { key: 'financial', title: 'Quản lý tài chính' },
    { key: 'learning', title: 'Quá trình học tập' },
    { key: 'referral', title: 'Tài khoản được giới thiệu' }
  ];
  nzFilterOption = () => true;
  constructor(
    private userControlService: UserControlService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap((searchText) => {
          if (searchText.trim().length === 0) {
            return of({
              success: true,
              data: [],
            });
          }
          return this.userControlService.searchUser(searchText);
        }),
        finalize(() => this.isLoading = false),
      )
      .subscribe({
        next: res => {
          if (res.success) {
            this.listUser = res.data;
          }
          else {
            this.message.error(res.errorMessages);
          }
        },
        error: err => {
          this.message.error(err);
        }
      })
  }

  searchUser(value: string):void {
    this.searchSubject.next(value);
  }

  onSelectionChange(event: UserData):void {
    this.userControlService.setUserData(event);
    // this.navigateTab(this.tabs[0].key);
  }

  onTabChange(index: number) {
    this.currentTab = this.tabs[index].key;
    this.navigateTab(this.tabs[index].key);
  }

  navigateTab(tab: string) {
    this.currentTab = tab;
    this.router.navigate(['page/general-control/user-control/' + tab]).then();
  }
}
