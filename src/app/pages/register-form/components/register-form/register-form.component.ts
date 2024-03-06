import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {Router} from "@angular/router";

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
  ) {
  }

  ngOnInit() {
  }

  create() {
    this.router.navigate(['page/setting/register-form/create'])
  }

  edit(data: any) {

  }

  delete(data: any) {

  }
}
