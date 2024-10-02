import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ELearningStudentService} from "../../services/e-learning-student.service";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-active-course',
  templateUrl: './active-course.component.html',
  styleUrls: ['./active-course.component.scss']
})
export class ActiveCourseComponent implements OnInit{
  readonly nzModalData = inject(NZ_MODAL_DATA);
  upgradeCourseForm!: FormGroup;
  listELearningCourse: any[] = [];
  constructor(
    private fb: FormBuilder,
    private eLearningStudentService: ELearningStudentService,
  ) {}

  ngOnInit() {
    this.upgradeCourseForm = this.fb.group({
      name: [null],
      studentId: [null],
      elearningId: [null],
      courseElearningPriceType: [null]
    });
    this.pathDataForm();
    this.eLearningStudentService.getECourseToActive().subscribe({
      next: res => {
        if(res.success) {
          this.listELearningCourse = res.data
        }
      }
    })
  }

  pathDataForm() {
    if (this.nzModalData) {
      const dataForm = {
        name: this.nzModalData.fullName,
        studentId: this.nzModalData.id
      }
      this.upgradeCourseForm.patchValue(dataForm);
    }
  }
}
