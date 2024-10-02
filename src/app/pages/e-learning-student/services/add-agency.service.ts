import { Injectable } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {AddAgencyComponent} from "../components/add-agency/add-agency.component";
import {ELearningStudentService} from "./e-learning-student.service";

@Injectable({
  providedIn: 'root'
})
export class AddAgencyService {

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private eLearningStudentService: ELearningStudentService,
  ) { }

  addAgency(data: any) {
    const modal: NzModalRef = this.modal.create<AddAgencyComponent>({
      nzTitle: 'Trao quyền đại lý',
      nzContent: AddAgencyComponent,
      nzData: data,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modal.destroy()
        },
        {
          label: 'Xác nhận',
          type: 'primary',
          loading: false,
          onClick: (instance) => {
            if (instance?.agencyForm.valid ) {
              modal.triggerOk().then();
            }
          }
        }
      ],
      nzOnOk: instance => {
        const data = {...instance.agencyForm.value};
        delete data.name;
        this.eLearningStudentService.addAgency(data).subscribe({
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
    })
  }
}
