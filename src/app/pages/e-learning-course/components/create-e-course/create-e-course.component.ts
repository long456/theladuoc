import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ECourseService } from '../../services/e-course.service';
import { FileManagerService } from "../../../../shared/services/file-manager.service";
import {finalize, take} from "rxjs";
import { config } from "../../../../shared/models/ckeditor";
import { teacher } from 'src/app/pages/setting/models/course';
import { CourseService } from 'src/app/pages/setting/services/course.service';
import { ELearningServicesService } from 'src/app/pages/e-learning-category/services/e-learning-services.service';
import { eCategoryOption } from 'src/app/pages/e-learning-category/models/e-category-option';
import { allowedValuesValidator } from '../../custom-validators/allowed-values-validator';
import { memberPolicyLevelOption } from '../../models/member-policy-level-option';

@Component({
  selector: 'app-create-e-course',
  templateUrl: './create-e-course.component.html',
  styleUrls: ['./create-e-course.component.scss']
})
export class CreateECourseComponent implements OnInit {
  isCreate!: boolean;
  courseForm!: FormGroup;
  isSubmit: boolean = false;
  ckEditorConfig: any = config;
  listTeacher: teacher[] = [];
  listCategory: eCategoryOption[] = [];
  listMemberPolicyLevel: memberPolicyLevelOption[] = [];
  courseElearningId!: number;
  showMemberPolicyLevel: boolean = false;
  isSpecialCourse: boolean = false;
  controlNames = {
    name: 'Tên khoá học',
    thumbImg: 'Ảnh đại diện',
    description: 'Giới thiệu ngắn',
    overviewDescription: 'Tổng quan khoá học',
    categoryId: 'Danh mục',
    teacherId: 'Giảng viên',
    price30Day: 'Giá thời hạn 30 ngày',
    price30DayOld: 'Giá cũ thời hạn 30 ngày',
    price90Day: 'Giá thời hạn 90 ngày',
    price90DayOld: 'Giá cũ thời hạn 90 ngày',
    price180Day: 'Giá thời hạn 180 ngày',
    price180DayOld: 'Giá cũ thời hạn 180 ngày',
    price365Day: 'Giá thời hạn 365 ngày',
    price365DayOld: 'Giá cũ thời hạn 365 ngày',
    priceForever: 'Giá thời hạn vĩnh viễn',
    priceForeverOld: 'Giá cũ thời hạn vĩnh viễn',
    completedPoint: 'Điểm tích luỹ',
    type: 'Loại khoá học',
    memberPolicyLevelId: 'Gói thành viên áp dụng tối thiểu',
    level: 'Cấp độ',
    language: 'Ngôn ngữ',
    introVideo: 'Link video giới thiệu',
    imgBanner: 'Ảnh banner',
    isCertificate: 'Chứng chỉ',
    certificateImage: 'Ảnh chứng chỉ',
    status: 'Trạng thái'
  };

  maxlengthConfig = {
    name: 100,
    description: 300,
    introVideo: 300,
  };
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private eCourseService: ECourseService,
    private courseService: CourseService,
    private eCategoryService: ELearningServicesService,
    private message: NzMessageService,
    private fileManagerService: FileManagerService
  ) {
  }

  ngOnInit(): void {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.courseForm = this.fb.group({
      courseElearningId: [null],
      name: [null, [Validators.required, Validators.maxLength(this.maxlengthConfig.name)]],
      thumbImg: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(this.maxlengthConfig.description)]],
      overviewDescription: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      teacherId: [null, [Validators.required]],
      price30Day: [0],
      price30DayOld: [0],
      price90Day: [0],
      price90DayOld: [0],
      price180Day: [0],
      price180DayOld: [0],
      price365Day: [0],
      price365DayOld: [0],
      priceForever: [0],
      priceForeverOld: [0],
      completedPoint: [null],
      type: [1, [Validators.required, allowedValuesValidator([1, 2, 3, 4, 5])]],
      memberPolicyLevelId: [null],
      level: [1, [allowedValuesValidator([1, 2, 3])]],
      language: [1, [allowedValuesValidator([1, 2])]],
      introVideo: [null, [Validators.maxLength(this.maxlengthConfig.introVideo)]],
      imgBanner: [null],
      isCertificate: [false],
      certificateImage: [null, [this.requireCerImgValidator()]],
      status: [1],
    },{validators: [this.validPriceCourse()]})

    const typeControl = this.courseForm.get('type');
    if (typeControl) {
      typeControl.valueChanges.subscribe(value => {
        this.onTypeChange(value);
      });
    }

    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listTeacher = res.data;
      }
    })

    this.eCategoryService.getListOprionCategory().subscribe(res => {
      if (res.success) {
        this.listCategory = res.data;
      }
    })

    this.eCourseService.getListMemberPolicyLevelOption().subscribe(res => {
      if (res.success) {
        this.listMemberPolicyLevel = res.data.memberPolicies;
      }
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.courseElearningId = id;
        this.eCourseService.getCourseById(id).subscribe({
          next: res => {
            this.courseForm.patchValue(res.data);
          }
        })
      })
    }
  }

  requireCerImgValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value === null || control.value === '';
      const isCertificate = this.courseForm?.get('isCertificate')?.value === true
      if (isValid && isCertificate) {
        return {requireCerImg: true}
      }
      return null
    }
  }

  getErrorMessage(controlKey: string): string {
    const control = this.courseForm.get(controlKey);
    if (control?.hasError('required') || control?.hasError('requireCerImg')) {
      return `${this.controlNames[controlKey as keyof typeof this.controlNames]} không được để trống!`;
    }
    if (control?.hasError('allowedValues')) {
      return `${this.controlNames[controlKey as keyof typeof this.controlNames]} không phù hợp!`;
    }
    if (control?.hasError('maxlength')) {
      const maxLength = this.maxlengthConfig[controlKey as keyof typeof this.maxlengthConfig];
      return `${this.controlNames[controlKey as keyof typeof this.controlNames]} có độ dài tối đa ${maxLength} ký tự!`;
    }
    return '';
  }

  edit(): void {
    this.isSubmit = true;
    if (this.courseForm.valid) {
      const priceFields = ['price30Day', 'price90Day', 'price180Day', 'price365Day', 'priceForever',
                           'price30DayOld', 'price90DayOld', 'price180DayOld', 'price365DayOld', 'priceForeverOld'];

      const data = {
        ...this.courseForm.value,
        courseElearningId: this.courseElearningId,
        teacherId: parseInt(this.courseForm.get('teacherId')?.value),
        categoryId: parseInt(this.courseForm.get('categoryId')?.value),
        status: this.courseForm.get('status')?.value ? 1 : 0,
        ...Object.fromEntries(
          priceFields.map(field => [field, this.courseForm.get(field)?.value || null])
        )
      }
      this.loading = true;
      const actionECourse = this.isCreate
        ? this.eCourseService.createCourse(data)
        : this.eCourseService.updateCourse(data);

      actionECourse
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: (err) => {
            this.message.error(err);
          },
        });
    }
  }

  onTypeChange(value: number): void {
    this.showMemberPolicyLevel = value == 2;
    this.isSpecialCourse = value == 3;
  }

  selectFile(typeImg: 'thumbImg' | 'imgBanner' | 'certificateImage'):void {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.courseForm.get(typeImg)?.patchValue(data);
    });
  }

  deleteImg(type: 'thumbImg' | 'imgBanner' | 'certificateImage'): void {
    this.courseForm.get(type)?.patchValue('');
  }

  validPriceCourse(): ValidatorFn {
    return () : ValidationErrors | null => {
      const courseType = this.courseForm?.get('type')?.value;
      if (courseType && courseType === 3) {
        const prices = ['price30Day', 'price90Day', 'price180Day', 'price365Day'];
        const hasInvalidPrice = prices.every(price => {
          const value = this.courseForm?.get(price)?.value;
          return value == null || value === 0 || value === '';
        });
        return hasInvalidPrice ? { invalidPrice: true } : null;
      }
      return null;
    }
  }

  navigateBack() {
    this.router.navigate(['/page/e-course/e-course-list']);
  }

  formatterVnd(value: number): string {
    return `${value} VND`
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
  }
}
