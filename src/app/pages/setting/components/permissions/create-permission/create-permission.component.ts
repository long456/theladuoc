import {Component, OnInit} from '@angular/core';
import {PermissionService} from "../../../services/permission.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss']
})
export class CreatePermissionComponent implements OnInit{

  listPermission = <any>[];

  permissionStatus = false;

  roleName: string = '';

  description: string = '';

  isCreate: boolean = false;

  idRole: number = 0;

  constructor(
    private permissionService: PermissionService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate']

    this.permissionService.getAllPermission().subscribe(res => {
      this.listPermission = [...res.data].map(item => {
        return {
          ...item,
          data: [],
        }
      });
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;

        this.idRole = id;

        this.permissionService.getRoleById(id).subscribe(item => {
          this.idRole = item.data.id
          this.roleName = item.data.roleName
          this.description = item.data.note
          this.permissionStatus = item.data.isActive
          this.listPermission = [...item.data.permissions].map(ele => {
            let data:  any[] = []
            ele.children.map((e : any) => {
              if (e.checked) {
                data.push(e.id)
              }
            })
            return {
              ...ele,
              data: data
            }
          })
        })
      })
    }
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
    const listPermission = [...this.listPermission].map(item => item.data).reduce((a, b) => a.concat(b))
    if (this.roleName === '') {
      this.message.error('Tên nhóm quyền không được để trống');
      return;
    }

    if (listPermission.length === 0) {
      this.message.error('Số lượng quyền chọn không được nhỏ hơn 1 lựa chọn');
      return;
    }

    const data = {
      roleName: this.roleName,
      permissionIds: JSON.stringify(listPermission),
      isActive: this.permissionStatus,
      note: this.description
    }

    if (this.isCreate) {
      this.permissionService.createRole(data).subscribe(
        {
          next: res => {
            if (res.success) {
              this.message.success('Tạo nhóm quyền thành công')
            }
          },
          error: (err) => {
            this.message.error(err)
          }
        }
      )
    } else {
      this.permissionService.updateRole(this.idRole, data).subscribe(
        {
          next: res => {
            if (res.success) {
              this.message.success('Chỉnh sửa nhóm quyền thành công')
            }
            this.navigateBack();
          },
          error: err => {
            this.message.error(err)
          }
        }
      )
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/permission/list'])
  }
}
