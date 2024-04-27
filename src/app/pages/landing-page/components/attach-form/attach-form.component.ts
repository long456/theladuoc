import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegisterFormService} from "../../../register-form/services/register-form.service";
import {LandingPageService} from "../../services/landing-page.service";

@Component({
  selector: 'app-attach-form',
  templateUrl: './attach-form.component.html',
  styleUrls: ['./attach-form.component.scss']
})
export class AttachFormComponent implements OnInit{
  readonly nzModalData= inject(NZ_MODAL_DATA);

  loading: boolean = false;

  formList: any[] = [];

  listOfSelectForm: number[] = [];

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private registerFormService: RegisterFormService,
    private landingPageService: LandingPageService,
  ) {
  }

  ngOnInit() {
    this.getListForm();
    this.listOfSelectForm = this.nzModalData.formRegisterList.map((item: any) => item.id);
  }

  getListForm() {
    this.registerFormService.getAllFormByCourse(this.nzModalData.courseId).subscribe({
      next: res => {
        if (res) {
          this.formList = res
        }
      }
    })
  }

  closeModal() {
    this.modal.destroy();
  }

  loadMore() {}

  attachForm() {
    console.log(this.nzModalData)
    this.landingPageService.attachForm(this.listOfSelectForm,this.nzModalData.id)
    .subscribe({
      next: res => {
        this.loading = false;
        if (res.success) {
          this.message.success(res.messages)
          this.closeModal();
        } else {
          this.message.error(res.errorMessages)
        }
      },
      error: err => {
        this.message.error(err)
        this.loading = false;
      }
    })
  }
}
