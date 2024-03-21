import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {EmailService} from "../../services/email.service";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private emailService: EmailService,
  ) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.data['type'];
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.emailForm = this.fb.group({
      emailSubject: [null, [Validators.required]],
      content: [null],
      enable: [null],
      no: [0],
      status: [0],
      isAttendance: [0],
      dateSend: [],
      timeSend: [],
      courseId: [],
    });

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
        this.emailForm.patchValue(res)
      }
    })
  }

  getTypeEmail() {
    if (this.type === 'system') {
      return 1
    }
    return 0
  }

  edit() {
    if (this.emailForm.valid) {
      let data = {
        ...this.emailForm.value,
        type: this.getTypeEmail()
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
    this.router.navigate(['/page/setting/email/system-email'])
  }
}
