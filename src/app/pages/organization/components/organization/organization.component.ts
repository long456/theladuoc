import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {AuthService} from "../../../../layouts/auth-layout/auth/services/auth.service";
import {Router} from "@angular/router";
import {OrganizationService} from "../../services/organization.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor(
    private authService: AuthService,
    private organizationService: OrganizationService,
    private router: Router,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.organizationService.getAllOrganization().subscribe({
      next: res => {
        if (res.success) {
          this.rowData = res.data.organizations;
        } else {
          this.message.error(res.errorMessages);
        }
      }
    })
  }

  createOrg(): void {
    this.router.navigate(['/page/organization/create'])
  }

  edit(data: any): void {
    this.router.navigate(['/page/organization/' + data.id])
  }

  updatePermission(data: any): void {
    this.router.navigate(['/page/organization/permission/' + data.id])
  }
}
