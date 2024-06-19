import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { NzI18nService, en_US, vi_VN, NzI18nInterface } from 'ng-zorro-antd/i18n';
import customViVn from './custom-vi-vn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;

  constructor(
    public router: Router,
    private i18n: NzI18nService
  ) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.isLoading = true;
      }
      if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }
  ngOnInit(): void {
    this.i18n.setLocale(customViVn);
  }
}
