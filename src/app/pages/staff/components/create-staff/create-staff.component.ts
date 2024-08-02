import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {StaffService} from "../../services/staff.service";
import {userType} from "../../models/staff";
import {PermissionService} from "../../../setting/services/permission.service";

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit{

  isCreate: boolean = false;

  isSubmit: boolean = false;

  userForm!: FormGroup;

  listUserType: userType[] = [];

  listPermission: any[] = [];

  staffId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private staffService: StaffService,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.userForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roleIds: [null],
      status: [1],
      type: [null, [Validators.required]],
      slugTeacher: [null],
    });

    this.staffService.getUserType().subscribe({
      next: value => {
        if (value.success) {
          this.listUserType = value.data
        } else {
          this.message.error(value.errorMessages)
        }
      }
    })

    this.permissionService.getAllRole().subscribe({
      next: value => {
        if (value.success) {
          this.listPermission = value.data
        } else {
          this.message.error(value.errorMessages)
        }
      }
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.staffId = id;

        this.staffService.getDetailStaff(this.staffId).subscribe({
          next: value => {
            if (value.success) {
              let userData = {
                ...value.data,
                roleIds: value.data.roles.map((item : any) => item.id),
                type: value.data.type.split(',').map((item : any) => +item)
              }
              this.userForm.patchValue(userData)
            }
          }
        })
      });
    }
  }

  validSlugTeacher():boolean {
    if ((this.userForm.get('type')?.value === 4 || this.userForm.get('type')?.value === 1) &&
      (this.userForm.get('slugTeacher')?.value === null || this.userForm.get('slugTeacher')?.value === '')
    ) {
      return true;
    }
    return false;
  }

  edit() {
    this.isSubmit = true;
    if (this.userForm.valid) {
      if(this.validSlugTeacher()) {
        this.message.error('Mã slug không được để trống');
        return
      }
      const data = {
        ...this.userForm.value,
        status: this.userForm.get('status')?.value ? 1 : 0,
        roleIds: (this.userForm.get('roleIds')?.value && this.userForm.value.roleIds.length !== 0) ? JSON.stringify(this.userForm.get('roleIds')?.value) : null,
        type: [...this.userForm.get('type')?.value].toString(),
      }
      if (this.isCreate) {
        this.staffService.createUser(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Tạo nhân viên thành công');
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.errors.Password[0]);
          }
        })
      } else {
        const updateData = {
          ...data,
          userId: this.staffId,
        }
        this.staffService.updateUser(updateData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/staff'])
  }
}
