import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmailService} from "../../services/email.service";
import {CourseService} from "../../../setting/services/course.service";

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
    private courseService: CourseService
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.emailNotificationForm = this.fb.group({
      emailSubject: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
      content: [null],
      status: [true],
      isAttendance: [true],
    });

    this.courseService.getListCourse().subscribe({
      next: res => {
        this.courseList = res
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
        };
        this.emailNotificationForm.patchValue(data);
      }
    })
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
            this.message.error(err.error);
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
            this.message.error(err.error);
          }
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/email/notifications-email'])
  }
}
