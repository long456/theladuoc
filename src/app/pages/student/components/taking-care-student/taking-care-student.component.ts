import {Component, OnInit} from '@angular/core';
import {TakingCareStudentService} from "../../services/taking-care-student.service";
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";

@Component({
  selector: 'app-taking-care-student',
  templateUrl: './taking-care-student.component.html',
  styleUrls: ['./taking-care-student.component.scss']
})
export class TakingCareStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  rowData: any;

  isExpand = false;

  listOfColumn: filterItem[] = []

  constructor(
    private takingCareStudentService: TakingCareStudentService
  ) {
  }

  ngOnInit() {
    this.takingCareStudentService.getTakingCareStudent().subscribe(res => {
      console.log((res as any).data)
      this.rowData = (res as any).data.users;
    })
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {

  }

}
