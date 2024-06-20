import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { NzI18nService, en_US, vi_VN, NzI18nInterface } from 'ng-zorro-antd/i18n';
import customViVn from './custom-vi-vn';
import { SpinnerService } from './shared/services/spinner-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading : Observable<boolean>;

  constructor(
    public router: Router,
    private i18n: NzI18nService,
    private spinnerService: SpinnerService
  ) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.spinnerService.showLoading();
      }
      if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.spinnerService.hideLoading();
      }
    });
    this.isLoading = this.spinnerService.loading$;
  }
  ngOnInit(): void {
    this.i18n.setLocale(customViVn);
  }
}
