import {Component, OnInit} from '@angular/core';
import {MembershipConfigService} from "../../../services/membership-config.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.scss']
})
export class ConfigDetailComponent implements OnInit{
  membershipConfigForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private membershipConfigService: MembershipConfigService,
  ) {}

  ngOnInit() {
    this.membershipConfigForm = this.fb.group({
      numberDaysInactivity: [null],
      description: [null],
      isShowPriceMonth: [true],
      isShowPrice3Month: [true],
      isShowPriceYear: [true],
      isShowPriceForever: [true],
    });
    this.membershipConfigService.getDetailMembershipConfig().subscribe({
      next: res => {
        if (res.success) {
          this.membershipConfigForm.patchValue(res.data);
        }
      }
    });
  }

  edit() {
    const configData = {...this.membershipConfigForm.value};
    this.membershipConfigService.updateMembershipConfig(configData).subscribe({
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

  navigateBack() {
    this.router.navigate(['/page/membership-policy/config/list']);
  }
}
