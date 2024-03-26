import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmailService} from "../../services/email.service";
import {CourseService} from "../../../setting/services/course.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit{

  emailForm!: FormGroup;

  type! : string;

  emailId!: number;

  isCreate!: boolean;

  isSubmit = false;

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

  courseList: any = [];

  timeStart: Date | null = null;
  timeEnd: Date | null = null;

  datePipe = new DatePipe('en-US');

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
    this.type = this.route.snapshot.data['type'];
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.emailForm = this.fb.group({
      emailSubject: [null, [Validators.required]],
      content: [null],
      enable: [true],
      no: [0],
      status: [true],
      isAttendance: [true],
      dateSend: [],
      courseId: [null, [Validators.required]],
    });

    if (this.type === 'notifications') {
      this.courseService.getListCourse().subscribe({
        next: res => {
          this.courseList = res
        },
        error: err => {
          this.message.error(err.error)
        }
      })
    }

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
        const data = {...res};
        data.dateSend = this.parseToDate(data.dateSend);
        this.parseToTime(data.timeSend);
        let timeArr = data.timeSend.split('-');
        this.timeStart = this.parseToTime(timeArr[0]);
        this.timeEnd = this.parseToTime(timeArr[1]);
        this.emailForm.patchValue(data);
      }
    })
  }

  parseToDate(date: string) {
    let dateStringSplit = date.split("/");
    return new Date(dateStringSplit[1] + '/' +dateStringSplit[0] +'/' +dateStringSplit[2]);
  }

  parseToTime(time: string) {
    let timeStringSplit = time.split(':')
    if (timeStringSplit.length === 2 ) {
      let dt = new Date();
      dt.setHours(Number(timeStringSplit[0]));
      dt.setMinutes(Number(timeStringSplit[1]));

      return dt
    }
    return null
  }

  getTypeEmail() {
    if (this.type === 'system') {
      return 1
    }
    return 2
  }

  timeChange() {
    if (this.timeStart && this.timeEnd) {
      let hour = Number(this.datePipe.transform(this.timeEnd, 'H')) -
                 Number(this.datePipe.transform(this.timeStart, 'H'))

      let min = Number(this.datePipe.transform(this.timeEnd, 'mm')) -
                Number(this.datePipe.transform(this.timeStart, 'mm'))

      if (hour < 0 ) {
        this.timeEnd = this.timeStart
      }

      if(hour === 0 && min < 0) {
        this.timeEnd = this.timeStart
      }
    }
  }

  edit() {
    this.isSubmit = true;
    if (this.emailForm.valid) {
      let data = {
        ...this.emailForm.value,
        type: this.getTypeEmail(),
        dateSend: this.datePipe.transform(this.emailForm.value.dateSend, 'dd/MM/YYYY'),
        timeSend: this.datePipe.transform(this.timeStart, 'HH:mm') + '-' + this.datePipe.transform(this.timeEnd, 'HH:mm'),
      }

      if (this.isCreate) {
        this.emailService.createEmail(data).subscribe({
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
        this.emailService.updateEmail(data, this.emailId).subscribe({
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
    if (this.type === 'system') {
      this.router.navigate(['/page/setting/email/system-email'])
    } else {
      this.router.navigate(['/page/setting/email/notifications-email'])
    }
  }
}
