import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../../shared/models/Table";
import {PermissionService} from "../../../services/permission.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-list-permision',
  templateUrl: './list-permision.component.html',
  styleUrls: ['./list-permision.component.scss']
})
export class ListPermisionComponent implements OnInit{

  isVisible = false;

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.permissionService.getAllRole().subscribe(res => {
      this.rowData = res.data;
    })
  }

  create(): void {
    this.router.navigateByUrl('/page/setting/permission/create')
  }

  edit(data: any): void {
    this.router.navigateByUrl('/page/setting/permission/' + data.id)
  }

  delete(data: any): void {
    this.permissionService.deleteRole(data.id)
      .pipe(
        switchMap(res => {
          if (res.success) {
            this.message.success('Xóa nhóm quyền thành công')
            return this.permissionService.getAllRole()
          } else {
            throw new Error(res.errorMessages)
          }
        })
      )
      .subscribe(
        {
          next: res => this.rowData = res.data,
          error: err => this.message.error(err)
        }
      )
  }



}
