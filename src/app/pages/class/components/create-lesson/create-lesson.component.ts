import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {LessonService} from "../../../lesson/services/lesson.service";
import {DatePipe} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit{
  lessonForm!: FormGroup;

  readonly #modal = inject(NzModalRef);
  readonly nzModalData= inject(NZ_MODAL_DATA);

  isSubmit: boolean = false;

  isLoading: boolean = false;

  datePipe = new DatePipe('en-US');

  isCreate!: boolean;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private lessonService: LessonService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.lessonForm = this.fb.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required]],
    });

    this.isCreate = this.nzModalData.isCreate;

    if (!this.isCreate) {
      const time = this.nzModalData.data.timeFrame.split(' - ')
      const data = {
        name: this.nzModalData.data.className,
        duration: [
          new Date(time[0]),
          new Date(time[1])
        ]
      };
      this.lessonForm.patchValue(data);
    }
  }

  closeModal() {
    this.modal.destroy();
  }

  addLesson() {
    this.isSubmit = true;
    if (this.lessonForm.valid) {
      this.isLoading = true;
      let data = {
        ...this.lessonForm.value,
        classId: this.nzModalData.data.id,
        startTime: this.datePipe.transform(this.lessonForm.value.duration[0], 'yyyy-MM-ddTHH:mm:ss') + 'Z',
        endTime: this.datePipe.transform(this.lessonForm.value.duration[1], 'yyyy-MM-ddTHH:mm:ss') + 'Z',
      }
      delete data.duration

      if (this.isCreate) {
        this.lessonService.createLesson(data).subscribe({
          next: value => {
            if(value.success) {
              this.message.success(value.messages);
              this.isLoading = false;
              this.closeModal();
            } else {
              this.message.error(value.errorMessages);
              this.isLoading = false;
              this.closeModal();
            }
          },
          error: err => {
            this.isLoading = false;
            this.message.error(err);
          }
        })
      } else {
        this.lessonService.updateLesson(this.nzModalData.data.id, data).subscribe({
          next: value => {
            if(value.success) {
              this.message.success(value.messages);
              this.isLoading = false;
              this.closeModal();
            } else {
              this.message.error(value.errorMessages);
              this.isLoading = false;
              this.closeModal();
            }
          },
          error: err => {
            this.isLoading = false;
            this.message.error(err);
          }
        })
      }
    }

  }

}
