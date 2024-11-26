import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserControlService} from "../../services/user-control.service";
import {Subscription} from "rxjs";
import {UserData} from "../../models/UserData";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {StaffService} from "../../../staff/services/staff.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.scss']
})
export class InfoControlComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  currentUser: UserData | null = null;
  userInfoForm!: FormGroup;
  baseUrl = environment.baseImgUrl
  listRole: {
    key: number;
    name: string;
  }[] = [];
  constructor(
    private userControlService: UserControlService,
    private fb: FormBuilder,
    private staffService: StaffService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.subscription = this.userControlService.data$.subscribe({
      next: data => {
        this.currentUser = data;
        this.formInit();
        this.getDataStaff();
        this.pathFormData();
      }
    })
  }

  formInit(): void {
    this.userInfoForm = this.fb.group({
      avatar: [null],
      code: [null],
      fullName: [null],
      phoneNumber: [null],
      email: [null],
      birthDay: [null],
      gender: [null],
      address: [null],
      referralLink: [null],
      referralUserName: [null],
      referralUserEmail: [null],
      userCaregiverName: [null],
      userCaregiverEmail: [null],
      memberShipLevels: [null],
      userRole: [null],
    });
  }

  pathFormData():void {
    if (this.currentUser) {
      this.userControlService.getUserInfo(this.currentUser.id, this.currentUser.userType).subscribe({
        next: res => {
          if (res.success) {
            const userInfo = {
              ...res.data,
              userRole: res.data.userRole.split(',').map((item : any) => +item)
            };
            this.userInfoForm.patchValue(userInfo);
          }
        }
      })
    }
  }

  hasValue(controlName: string): boolean {
    const control = this.userInfoForm.get(controlName);
    return control ? !!control.value : false;
  }

  getValue(controlName: string): any {
    const control = this.userInfoForm.get(controlName);
    return control ? control.value : [];
  }

  getDataStaff(): void {
    this.staffService.getUserType().subscribe({
      next: value => {
        if (value.success) {
          this.listRole = value.data
        } else {
          this.message.error(value.errorMessages)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
