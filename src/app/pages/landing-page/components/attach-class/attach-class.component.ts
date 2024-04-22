import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {ClassService} from "../../../class/services/class.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {delay, tap} from "rxjs";

@Component({
  selector: 'app-attach-class',
  templateUrl: './attach-class.component.html',
  styleUrls: ['./attach-class.component.scss']
})
export class AttachClassComponent implements OnInit{

  readonly nzModalData= inject(NZ_MODAL_DATA);

  loading: boolean = false;

  classList: any[] = [];

  selectedClass = null;

  constructor(
    private classService: ClassService,
    private modal: NzModalRef,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.getListClass();
  }

  getListClass() {
      this.classService.getClassByCourse(this.nzModalData.courseId).subscribe({
        next: res => {
          this.classList = res
        }
      })
  }

  loadMore() {

  }

  closeModal() {
    this.modal.destroy();
  }

  attachClass(){
    if (!this.selectedClass) {
      this.message.error('Lớp không được để trống')
      return
    }
    const data = {
      landingPageId: this.nzModalData.id,
      classId: this.selectedClass
    }
    this.loading = true;
    this.classService.attachLandingPage(data)
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
