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
  isActive: boolean = false;
  constructor(
    private fb: FormBuilder,
    private eLearningStudentService: ELearningStudentService,
  ) {}

  ngOnInit() {
    this.upgradeCourseForm = this.fb.group({
      name: [null],
      studentId: [null],
      elearningId: [null],
      courseElearningPriceType: [1]
    });
    this.pathDataForm();
    this.eLearningStudentService.getECourseToActive().subscribe({
      next: res => {
        if(res.success) {
          this.listELearningCourse = res.data
        }
      }
    })

    this.upgradeCourseForm.controls['elearningId'].valueChanges.subscribe(change => {
      const courseType = this.listELearningCourse.filter(course => course.id === change)[0].type;
      if (courseType === 3) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
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
