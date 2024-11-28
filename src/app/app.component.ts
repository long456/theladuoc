import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { NzI18nService, en_US, vi_VN, NzI18nInterface } from 'ng-zorro-antd/i18n';
import customViVn from './custom-vi-vn';
import { SpinnerService } from './shared/services/spinner-service';
import {delay, Observable, tap} from 'rxjs';
import {OrganizationService} from "./pages/organization/services/organization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  isLoading : Observable<boolean>;
  favIcon: HTMLLinkElement | null = null;
  titleCms: InnerHTML | null = null;

  constructor(
    public router: Router,
    private i18n: NzI18nService,
    private spinnerService: SpinnerService,
    private organizationService: OrganizationService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading = this.spinnerService.loading$.pipe(
      delay(0),
      tap(() => this.cdr.detectChanges())
    );

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.spinnerService.showLoading();
      }
      if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.spinnerService.hideLoading();
      }
    });
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

  ngAfterViewInit(): void {
    this.favIcon = document.querySelector('#favIcon');
    this.titleCms = document.querySelector('title');
  }

  cacheOrgData(data: any): void{
    localStorage.setItem('org', JSON.stringify(data));
  }
}
