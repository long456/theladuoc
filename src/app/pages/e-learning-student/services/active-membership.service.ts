import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningStudentService} from "./e-learning-student.service";
import {ActiveMembershipComponent} from "../components/active-membership/active-membership.component";


@Injectable({
  providedIn: 'root'
})
export class ActiveMembershipService {

  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private eLearningStudentService: ELearningStudentService,
  ) { }

  giftMembership(data: any) {
    const modal: NzModalRef = this.modal.create<ActiveMembershipComponent>({
      nzTitle: 'Tặng gói thành viên',
      nzContent: ActiveMembershipComponent,
      nzData: data,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modal.destroy()
        },
        {
          label: 'Xác nhận',
          type: 'primary',
          onClick: (instance) => {
            if (!(instance instanceof ActiveMembershipComponent) ||
              instance.giftMembershipForm.value.memberPolicyLevelId === null) {
              this.message.error('Gói thành viên không được để trống!');
            } else {
              modal.triggerOk().then();
            }
          }
        }
      ],
      nzOnOk: instance => {
        const data = {...instance.giftMembershipForm.value};
        delete data.name;
        this.eLearningStudentService.activeMembership(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      }
    });
  }
}
