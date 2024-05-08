import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {CourseService} from "../../../setting/services/course.service";
import {ClassService} from "../../../class/services/class.service";

@Component({
  selector: 'app-upgrade-course',
  templateUrl: './upgrade-course.component.html',
  styleUrls: ['./upgrade-course.component.scss']
})
export class UpgradeCourseComponent implements OnInit{

  readonly nzModalData= inject(NZ_MODAL_DATA);

  upgradeCourseForm!: FormGroup;

  nameFilePreview!: string;

  listCourse: any[] = [];

  listClass: any[] = [];

  courseSelected!: number;

  isSubmit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
  ) {}

  ngOnInit() {
    this.upgradeCourseForm = this.fb.group({
      userAffId: [null],
      courseId: [null,[Validators.required]],
      classId: [null,[Validators.required]],
      name: [''],
      isPay: [1],
      price: [0],
      amountPaid: [0],
      receiptImage: [null]
    })

    this.upgradeCourseForm.get('name')?.patchValue(this.nzModalData.name);
    this.upgradeCourseForm.get('userAffId')?.patchValue(this.nzModalData.id);

    this.courseService.getListCourse(2).subscribe(res => {
      this.listCourse = res;
    })
  }

  formatterVnd(value: number): string {
    return `${value} VND`;
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name
    this.upgradeCourseForm.patchValue({ receiptImage: files[0] });
    this.upgradeCourseForm.get('file')?.updateValueAndValidity();
  }

  onCourseSelect() {
    if (this.courseSelected) {
      const course = this.listCourse.filter(item => item.id === this.courseSelected)[0];
      this.listClass = course.classes;
      this.upgradeCourseForm.get('classId')?.patchValue(null);
      this.upgradeCourseForm.get('price')?.patchValue(course.price);
      this.upgradeCourseForm.get('courseId')?.patchValue(this.courseSelected);
    }
  }
}
