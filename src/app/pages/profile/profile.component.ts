import {Component, OnInit} from '@angular/core';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {AuthService} from "../../layouts/auth-layout/auth/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import { NzSliderModule } from 'ng-zorro-antd/slider';
import {skill} from "./models/skill";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [NzTabsModule, NzGridModule, NzDividerModule, NzInputModule, ReactiveFormsModule, CommonModule, FormsModule,
    NzSelectModule, NzAvatarModule, NzButtonModule, NzDatePickerModule, NzIconModule, NzUploadModule, NzSliderModule],
  standalone: true
})
export class ProfileComponent implements OnInit{
  passwordVisible = false;
  forgetPasswordForm!: FormGroup;
  userForm!: FormGroup;
  file: any;
  linkAvatar!: string;
  teacherInfoForm!: FormGroup;
  skillList: skill[] = [];
  activeSkill: number | null = null;
  userType!:string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.forgetPasswordForm = this.fb.group(
    {
      oldPassword: [null, [Validators.required]],
      password: [null, [
        Validators.required,
        this.minLengthValidator(8),
        this.uppercaseValidator(),
        this.lowercaseValidator(),
        this.digitValidator()
      ]],
      confirmPassword: [null, [Validators.required]],
      },
    {
      validators: this.confirmPasswordValidator,
      })

    this.userForm = this.fb.group({
      fullName: [null, [Validators.required]],
      sex: [null],
      address: [null],
      mobile: [null, [Validators.pattern('[0-9]{10,15}')]],
      birthday: [null],
      email: [null],
      code: [null],
    });

    this.teacherInfoForm = this.fb.group({
      slugTeacher: [null,[Validators.required,]],
      positionName: [null],
      description: [null],
      phoneNumber: [null],
      linkFacebook: [null],
      linkTiktok: [null],
      linkYoutube: [null],
      linkWebsite: [null],
    });

    this.authService.getUserProfile().subscribe({
      next: res => {
        if (res.success) {
          this.userType = res.data.type;
          const baseUrl = environment.baseImgUrl
          this.linkAvatar = baseUrl + res.data.avatar;
          this.userForm.patchValue(res.data);

          if (this.userType && this.userType.includes('4')) {
            this.getInfoTeacher();
          }
        }
      }
    });
  }

  getInfoTeacher() {
    this.authService.getProfileTeacher().subscribe({
      next: res => {
        if (res.success) {
          this.teacherInfoForm.patchValue(res.data);
          if (res.data.skills) {
            this.skillList = JSON.parse(res.data.skills);
          }
        }
      }
    });
  }

  minLengthValidator(length: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value === null) {
        return null;
      }
      return control.value.length >=  length ? null : {minlength: true};
    };
  }

  uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value === null) {
        return null;
      }
      const hasUppercase = /[A-Z]+/.test(control.value);
      return hasUppercase ? null : {noUppercase: true};
    };
  }

  lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value === null) {
        return null;
      }
      const hasLowercase = /[a-z]+/.test(control.value);
      return hasLowercase ? null : { noLowercase: true };
    };
  }

  digitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value === null) {
        return null;
      }
      const hasDigit = /\d/.test(control.value);
      return hasDigit ? null : { noDigit: true };
    };
  }

  confirmPasswordValidator(control: AbstractControl) {
    if (control.get('confirmPassword')?.value === null) {
      return null
    }
    return control.get('password')?.value ===
    control.get('confirmPassword')?.value
      ? null
      : {missMatch: true};
  }

  changePassword() {
    if (this.forgetPasswordForm.valid) {
      this.authService.updateUserPassword(this.forgetPasswordForm.value).subscribe({
        next: res => {
          if (res.success) {
            this.message.success('Đổi mật khẩu thành công')
          } else {
            this.message.error(res.errorMessages)
          }
        }
      })
    }
  }

  updateUserProfile() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const pipeDate = new DatePipe('en-US');
      const data = {
        fullName: userData.fullName,
        sex: userData.sex,
        address: userData.address,
        mobile: userData.mobile,
        birthday: pipeDate.transform(userData.birthday, 'dd/MM/YYYY'),
        avatar: null
      }
      this.authService.updateUserProfile(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success('Cập nhật thông tin người dùng thành công');
          } else {
            this.message.error(res.errorMessages);
          }
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/page']);
  }

  handleChange(e: any) {
    let data = new FormData();
    data.append('file', e.target.files[0])
    this.authService.updateAvatar(data).subscribe({
      next: res =>{
        if (res.success) {
          const baseUrl = environment.baseImgUrl
          this.linkAvatar = baseUrl + res.data.avatar;
          this.message.success('Cập nhật ảnh đại diện thành công');
        }
      }
    })
  }

  setActiveSkill(index: number):void {
    this.activeSkill = index;
  }

  addSkill() {
    const skillObj: skill = {
      progress: 0,
      skillName: ''
    }
    this.skillList.push(skillObj);
  }

  removeSkill(index: number):void {
    this.skillList.splice(index, 1);
  }

  skillNameValidator():boolean {
    let errorCount = 0;
    if (this.skillList.length > 0) {
      this.skillList.forEach((item) => {
        if (item.skillName === '') {
          errorCount++;
        }
      });
    }

    if (errorCount > 0) {
      return false;
    }
    return true;
  }

  updateInfoTeacher():void {
    if (this.skillNameValidator() && this.teacherInfoForm.valid) {
      const data = {
        ...this.teacherInfoForm.value,
        skills: this.skillList
      }
      this.authService.updateProfileTeacher(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success('Cập nhật thông tin giảng viên thành công');
          } else {
            this.message.error(res.errorMessages);
          }
        }
      });
    } else {
      this.message.error('Tên kỹ năng không được để trống');
    }
  }
}
