import {Component, HostListener, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {CourseService} from "../../../setting/services/course.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-upgrade-course',
  templateUrl: './upgrade-course.component.html',
  styleUrls: ['./upgrade-course.component.scss']
})
export class UpgradeCourseComponent implements OnInit{

  @HostListener('paste', ['$event']) onPaste(e: any) {
    const items = e.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      this.upgradeCourseForm.patchValue({ receiptImage: blob });
      this.upgradeCourseForm.get('file')?.updateValueAndValidity();
      this.nameFilePreview = blob.name;
      this.blobToDataUrl(blob);
    } else {
      this.message.error('Chưa có file nào được copy hoặc định dạng file copy không hợp lệ')
    }
  }

  readonly nzModalData= inject(NZ_MODAL_DATA);

  upgradeCourseForm!: FormGroup;

  nameFilePreview!: string;

  listCourse: any[] = [];

  listClass: any[] = [];

  courseSelected!: number;

  isSubmit: boolean = false;

  imgPreviewUrl!: string | ArrayBuffer | null | undefined;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.upgradeCourseForm = this.fb.group({
      userAffId: [null],
      courseId: [null,[Validators.required]],
      classId: [null,[Validators.required]],
      name: [''],
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
    const currency = new CurrencyPipe('vi-VN');
    const transformed = currency.transform(value, 'VND', 'symbol', '1.0-0');
    return transformed !== null && transformed !== undefined ? transformed : '';
  }

  parserVnd(value: string): string {
    const currency = new CurrencyPipe('vi-VN');
    const transformed = currency.transform(value, 'VND', 'symbol', '1.0-0');
    return transformed !== null && transformed !== undefined ? transformed : '';
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name
    this.blobToDataUrl(files[0]);
    this.upgradeCourseForm.patchValue({ receiptImage: files[0] });
    this.upgradeCourseForm.get('file')?.updateValueAndValidity();
  }

  blobToDataUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreviewUrl = e.target?.result;
    }
    reader.readAsDataURL(file)
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
