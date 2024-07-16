import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { NzI18nService, en_US, vi_VN, NzI18nInterface } from 'ng-zorro-antd/i18n';
import customViVn from './custom-vi-vn';
import { SpinnerService } from './shared/services/spinner-service';
import { Observable } from 'rxjs';
import {OrganizationService} from "./pages/organization/services/organization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading : Observable<boolean>;
  favIcon: HTMLLinkElement | null = document.querySelector('#favIcon');
  titleCms: InnerHTML | null = document.querySelector("title");

  constructor(
    public router: Router,
    private i18n: NzI18nService,
    private spinnerService: SpinnerService,
    private organizationService: OrganizationService
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
    this.organizationService.getInfoOrganization().subscribe({
      next: res => {
        if (res.success) {
          this.cacheOrgData(res.data);
          if (this.favIcon) {
            this.favIcon.href = res.data.favicon;
          }

          if (this.titleCms) {
            this.titleCms.innerHTML = res.data.name;
          }
        }
      }
    });
  }

  cacheOrgData(data: any): void{
    localStorage.setItem('org', JSON.stringify(data));
  }
}
