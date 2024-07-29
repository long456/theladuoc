import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {LessonService} from "../../services/lesson.service";

@Component({
  selector: 'app-attach-zoom-link',
  templateUrl: './attach-zoom-link.component.html',
  styleUrls: ['./attach-zoom-link.component.scss']
})
export class AttachZoomLinkComponent implements OnInit{
  readonly nzModalData= inject(NZ_MODAL_DATA);
  infoZoomForm!: FormGroup;
  isLoading: boolean = false;
  lessonId!: number;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private message: NzMessageService,
    private lessonService: LessonService,
  ) {}

  ngOnInit() {
    this.infoZoomForm = this.fb.group({
      linkZoom: [null],
      zoomId: [null],
      zoomPassword: [null],
    });

    if (this.nzModalData) {
      this.lessonId = this.nzModalData.id;
    }
  }

  closeModal() {
    this.modal.destroy();
  }

  attach() {
    this.isLoading = true;
    const dataZoom = {
      ...this.infoZoomForm.value,
    }
    this.lessonService.attachLinkZoom(dataZoom, this.lessonId).subscribe({
      next: value => {
        if(value.success) {
          this.message.success(value.messages);
          this.isLoading = false;
          this.modal.triggerOk().then();
          this.closeModal();
        } else {
          this.message.error(value.errorMessages);
          this.isLoading = false;
        }
      },
      error: err => {
        this.isLoading = false;
        this.message.error(err);
      }
    })
  }
}
