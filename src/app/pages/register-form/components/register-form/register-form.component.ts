import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit{

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor(
    private router: Router,
    private registerFormService: RegisterFormService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.registerFormService.getAllForm().subscribe({
      next: res => {
        if (res.success) {
          this.rowData = res.data.formRegisterList
        } else {
          this.message.error(res.errorMessages)
        }
      }
    })
  }

  create() {
    this.router.navigate(['page/setting/register-form/create'])
  }

  edit(data: any) {

  }

  delete(data: any) {

  }
}
