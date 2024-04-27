import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {CourseService} from "../../../setting/services/course.service";
import {EmailSmtpService} from "../../services/email-smtp.service";

@Component({
  selector: 'app-create-email-account',
  templateUrl: './create-email-account.component.html',
  styleUrls: ['./create-email-account.component.scss']
})
export class CreateEmailAccountComponent implements OnInit{

  isCreate: boolean = false;
  isSubmit: boolean = false;

  emailAccountForm! : FormGroup;

  listOpAccount: any[] = [];

  emailAccountId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private courseService: CourseService,
    private emailSmtpService: EmailSmtpService,
  ) {
  }

  ngOnInit() {
    this.emailAccountForm = this.fb.group({
      userId : [0],
      addressEmail : [null, [Validators.required]],
      name : [null, [Validators.required]],
      host : [null, [Validators.required]],
      userName : [null, [Validators.required]],
      password : [null, [Validators.required]],
      port : [null, [Validators.required]],
      ssl : [true],
      isDefault : [true],
    });

    this.isCreate = this.route.snapshot.data['isCreate'];

    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listOpAccount = res.data;
        this.listOpAccount.push({
          id: 0,
          fullName: "Tổ chức",
        })
      }
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.emailAccountId = id;
      })

      this.pathEmailAccountData(this.emailAccountId);
    }
  }

  pathEmailAccountData(id: number) {
    this.emailSmtpService.getEmailAccountById(id).subscribe({
      next: res => {
        let data = {
          ...res.data,
          userId: res.data.userId ? res.userId : 0,
        }
        this.emailAccountForm.patchValue(data)
      }
    })
  }

  edit() {
    this.isSubmit = true;
    if (this.emailAccountForm.valid) {
      const data = {
        ...this.emailAccountForm.value,
        userId: this.emailAccountForm.value.userId === 0 ? null : this.emailAccountForm.value.userId
      }

      if (this.isCreate) {
        this.emailSmtpService.createEmailAccount(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Tạo email smtp thành công');
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error('Lỗi tạo email smtp');
          }
        })
      } else {
        this.emailSmtpService.updateEmailAccount(this.emailAccountId, data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Cập nhật email smtp thành công');
              this.navigateBack();
            } else {
              this.message.error('Lỗi cập nhật email smtp');
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        })
      }
    }
  }

  navigateBack(): void {
    this.router.navigate(['/page/setting/email-account']);
  }
}
