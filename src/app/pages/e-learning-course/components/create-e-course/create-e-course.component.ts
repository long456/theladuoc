import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ECourseService } from '../../services/e-course.service';
import { FileManagerService } from "../../../../shared/services/file-manager.service";
import { take } from "rxjs";
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

  controlNames = {
    name: 'Tên khoá học',
    thumbImg: 'Ảnh đại diện',
    description: 'Giới thiệu ngắn',
    overviewDescription: 'Tổng quan khoá học',
    categoryId: 'Danh mục',
    teacherId: 'Giảng viên',
    price: 'Giá mới',
    oldPrice: 'Giá cũ',
    type: 'Loại khoá học',
    memberPolicyLevelId: 'Gói thành viên áp dụng tối thiểu',
    level: 'Cấp độ',
    language: 'Ngôn ngữ',
    introVideo: 'Link video giới thiệu',
    imgBanner: 'Ảnh banner',
    isCertificate: 'Chứng chỉ',
    status: 'Trạng thái'
  };

  maxlengthConfig = {
    name: 100,
    description: 300,
    introVideo: 300,
  };

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
      price: [0],
      oldPrice: [0],
      type: [1, [Validators.required, allowedValuesValidator([1, 2, 3, 4, 5])]],
      memberPolicyLevelId: [null],
      level: [1, [allowedValuesValidator([1, 2, 3])]],
      language: [1, [allowedValuesValidator([1, 2])]],
      introVideo: [null, [Validators.maxLength(this.maxlengthConfig.introVideo)]],
      imgBanner: [null],
      isCertificate: [false],
      status: [1],
    })

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

  getErrorMessage(controlKey: string): string {
    const control = this.courseForm.get(controlKey);
    if (control?.hasError('required')) {
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
      const data = {
        ...this.courseForm.value,
        courseElearningId: this.courseElearningId,
        teacherId: parseInt(this.courseForm.get('teacherId')?.value),
        categoryId: parseInt(this.courseForm.get('categoryId')?.value),
        status: this.courseForm.get('status')?.value ? 1 : 0,
      }
      if (this.isCreate) {

        this.eCourseService.createCourse(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        })
      } else {
        this.eCourseService.updateCourse(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        });
      }
    }
  }

  onTypeChange(value: number): void {
    this.showMemberPolicyLevel = value == 2;
  }

  selectFile(typeImg: string) {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      switch (typeImg) {
        case ('thumbImg'):
          this.courseForm.get('thumbImg')?.patchValue(data);
          break;
        case ('imgBanner'):
          this.courseForm.get('imgBanner')?.patchValue(data);
          break;
      }
    });
  }

  deleteImg(type: 'thumbImg' | 'imgBanner'): void {
    switch (type) {
      case ('thumbImg'):
        this.courseForm.get('thumbImg')?.patchValue('');
        break;
      case ('imgBanner'):
        this.courseForm.get('imgBanner')?.patchValue('');
        break;
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
