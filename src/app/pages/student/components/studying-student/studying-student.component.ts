import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {StudyingStudentService} from "../../services/studying-student.service";

@Component({
  selector: 'app-studying-student',
  templateUrl: './studying-student.component.html',
  styleUrls: ['./studying-student.component.scss']
})
export class StudyingStudentComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;

  rowData: any;

  isExpand = false;

  listOfColumn: filterItem[] = []

  constructor(
    private studyingStudentService: StudyingStudentService
  ) {
  }

  ngOnInit() {
    this.studyingStudentService.getStudyingStudent().subscribe(res => {
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
