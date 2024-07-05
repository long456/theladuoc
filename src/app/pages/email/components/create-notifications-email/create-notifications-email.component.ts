import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmailService} from "../../services/email.service";
import {CourseService} from "../../../setting/services/course.service";
import {LessonService} from "../../../lesson/services/lesson.service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
import {linearGradient} from "html2canvas/dist/types/css/types/functions/linear-gradient";
import {ClassService} from "../../../class/services/class.service";

@Component({
  selector: 'app-create-notifications-email',
  templateUrl: './create-notifications-email.component.html',
  styleUrls: ['./create-notifications-email.component.scss']
})
export class CreateNotificationsEmailComponent implements OnInit{

  emailNotificationForm!: FormGroup;

  emailId!: number;

  isCreate!: boolean;

  isSubmit = false;

  courseList: any = [];

  courseId!: number;

  typeEmailList: any = [];

  lessonList: any = [];

  classList: any = [];

  ckEditorConfig: any = {
    toolbar: [
      ['Source', 'Templates', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
      [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
      [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ],
      [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],
      [ 'Link', 'Unlink', 'Anchor' ],
      [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ],
      [ 'Styles', 'Format', 'Font', 'FontSize' ],
      [ 'TextColor', 'BGColor' ],
      [ 'Maximize', 'ShowBlocks' ]
    ],
    extraAllowedContent: 'style meta script section svg;link[!href,target];a[!href,target]'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private emailService: EmailService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private classService: ClassService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.emailNotificationForm = this.fb.group({
      emailSubject: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
      lessonId: [null],
      classId: [null],
      content: [null],
      status: [true],
      typeEmail: [null,[Validators.required]],
    },{ validators: [this.validLesson(), this.validClass()] });

    this.courseService.getListCourse().subscribe({
      next: res => {
        this.courseList = res;
      },
      error: err => {
        this.message.error(err)
      }
    });

    this.emailService.getEmailType().subscribe({
      next: res => {
        if (res.success) {
          const emailTypeData = [...res.data];
          emailTypeData.forEach(item => {
            if (item.dataValue === 2 || item.dataValue === 1) {
              item.disabled = true;
            }
          });
          this.typeEmailList = emailTypeData
        }
      },
      error: err => {
        this.message.error(err.error)
      }
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.emailId = id;
      })

      this.getDataEmail(this.emailId);
    }
  }

  getDataEmail(id: number) {
    this.emailService.getEmailById(id).subscribe({
      next: res => {
        const data = {
          ...res,
          status: !!res.status,
          typeEmail: res.notiEmailTemplateType
        };
        this.emailNotificationForm.patchValue(data);
      }
    })
  }

  validLesson(): ValidatorFn {
    return () : ValidationErrors | null => {
      const typeEmail = this.emailNotificationForm?.get('typeEmail')?.value;
      const lessonId = this.emailNotificationForm?.get('lessonId')?.value;

      if ((typeEmail === 5 || typeEmail === 6) && !lessonId) {
        return { lessonRequired: true };
      }
      return null;
    }
  }

  validClass(): ValidatorFn {
    return () : ValidationErrors | null => {
      const typeEmail = this.emailNotificationForm?.get('typeEmail')?.value;
      const classId = this.emailNotificationForm?.get('classId')?.value;

      if ((typeEmail === 7) && !classId) {
        return { classRequired: true };
      }
      return null;
    }
  }

  onCourseSelect(e: any) {
    this.emailNotificationForm.get('lessonId')?.patchValue(null);
    this.emailNotificationForm.get('classId')?.patchValue(null);

    if (e && (this.emailNotificationForm.value?.typeEmail === 5 || this.emailNotificationForm.value?.typeEmail === 6)) {
      this.lessonService.getAllLesson(e).subscribe({
        next: res => {
          if (res) {
            this.lessonList = res;
          }
        },
        error: err => {
          this.message.error(err);
        }
      })
    }

    if (e && this.emailNotificationForm.value?.typeEmail === 7) {
      this.classService.getClassByCourse(e).subscribe({
        next: res => {
          if (res) {
            this.classList = res;
          }
        },
        error: err => {
          this.message.error(err);
        }
      })
    }
  }

  edit() {
    this.isSubmit = true;
    if (this.emailNotificationForm.valid) {
      let data = {
        ...this.emailNotificationForm.value,
        status: this.emailNotificationForm.value.status? 1: 0,
      }
      if (this.isCreate) {
        this.emailService.createNotificationsEmail(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      } else {
        this.emailService.updateNotificationsEmail(data, this.emailId).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/email/notifications-email'])
  }
}
