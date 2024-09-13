import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MembershipService} from "../../../e-learning-membership/services/membership.service";
import {MembershipGift} from "../../models/MembershipGift";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-active-membership',
  templateUrl: './active-membership.component.html',
  styleUrls: ['./active-membership.component.scss']
})
export class ActiveMembershipComponent implements OnInit{
  readonly nzModalData = inject(NZ_MODAL_DATA);
  giftMembershipForm!: FormGroup;
  listMembership: MembershipGift[] = [];
  constructor(
    private fb: FormBuilder,
    private membershipService: MembershipService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.giftMembershipForm = this.fb.group({
      name: [null],
      studentId: [null],
      memberPolicyLevelId: [null],
      memberPriceType: [1],
    });
    this.pathDataForm();
    this.membershipService.getMemberPolicyOption().subscribe({
      next: res => {
        if (res.success) {
          this.listMembership = res.data;
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    });
  }

  pathDataForm() {
    if (this.nzModalData) {
      const dataForm = {
        name: this.nzModalData.fullName,
        studentId: this.nzModalData.id
      }
      this.giftMembershipForm.patchValue(dataForm);
    }
  }
}
