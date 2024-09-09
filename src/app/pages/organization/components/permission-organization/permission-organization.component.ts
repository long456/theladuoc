import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../services/organization.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, map} from "rxjs";
import {Permission} from "../../models/Permission";


@Component({
  selector: 'app-permission-organization',
  templateUrl: './permission-organization.component.html',
  styleUrls: ['./permission-organization.component.scss']
})
export class PermissionOrganizationComponent implements OnInit{

  listPermission: Permission[] = [];

  organizationId!: number

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params.pipe().subscribe(params => {
      const { id } = params;

      this.organizationId = id;
      this.organizationService.getPermissionOrganizationById(id).subscribe({
        next: res => {
          if (res.success) {
            this.listPermission = [...res.data.permissions].map(item => {
              let data:  any[] = []
              item.children.map((e : any) => {
                if (e.checked) {
                  data.push(e.id)
                }
              })
              return {
                ...item,
                data: data
              }
            })
          } else {
            this.message.error(res.errorMessages)
          }
        }
      })
    })
  }

  valueChange(event: any, permission: any) {
    permission.data = event
    if (permission.data.length === permission.children.length) {
      permission.checked = true
    } else {
      permission.checked = false
    }
  }

  updateAllChecked(event: any, permission: any) {
    if (event) {
      permission.data = [...permission.children].map(item => item.id)
      permission.children = [...permission.children].map(item => {
        return {
          ...item,
          checked: true
        }
      })
    } else {
      permission.data = []
      permission.children = [...permission.children].map(item => {
        return {
          ...item,
          checked: false
        }
      })
    }
  }

  edit() {
    const listPermission = [...this.listPermission]
      .map(item => item.data || [])  // Nếu data không tồn tại, sử dụng mảng rỗng
      .filter((data): data is number[] => data !== undefined)  // Loại bỏ các undefined
      .reduce((a, b) => a.concat(b), [] as number[]);

    const data = {
      id: this.organizationId,
      permissionIds: JSON.stringify(listPermission)
    }

    this.organizationService.updatePermissionOrganization(data).subscribe({
      next: res => {
        if (res.success) {
          this.message.success('Cập nhật quyền tổ chức thành công');
          this.navigateBack();
        } else {
          this.message.error(res.errorMessages)
        }
      }
    })
  }

  navigateBack() {
    this.router.navigate(['/page/organization'])
  }
}
