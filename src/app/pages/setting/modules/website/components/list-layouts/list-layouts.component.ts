import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
@Component({
  selector: 'app-layouts',
  templateUrl: './list-layouts.component.html',
  styleUrls: ['./list-layouts.component.scss']
})
export class ListLayoutsComponent implements OnInit {

  dummyData = [
    {
      id: 1,
      OrganizationName: 'Test',
      RepresentativeName: 'Test 1',

    }
  ]

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor(
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.rowData = this.dummyData
  }

  edit(data: any) {
    this.router.navigate(['page/setting/website/list-layouts/' + data.id])
  }

}
