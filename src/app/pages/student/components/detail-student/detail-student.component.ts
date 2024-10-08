import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.scss']
})
export class DetailStudentComponent implements OnInit{

  detailStudentForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.detailStudentForm = this.fb.group(this.getFormControl())
  }

  getFormControl() {
    const studentData = this.studentService.getStudentData()
    delete studentData.id;

    const control: { [key: string]: any; } = {}
    for (let prop in studentData) {
      control[prop] = [studentData[prop]]
    }
    return control
  }

}
