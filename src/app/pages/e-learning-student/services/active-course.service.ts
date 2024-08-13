import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActiveCourseComponent} from "../components/active-course/active-course.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningStudentService} from "./e-learning-student.service";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Injectable({
  providedIn: 'root'
})
export class ActiveCourseService {

  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private message: NzMessageService,
    private eLearningStudentService: ELearningStudentService,
  ) {}

  activeCourse(data: any) {
    const modal: NzModalRef = this.modal.create<ActiveCourseComponent>({
      nzTitle: 'Kích hoạt khóa học',
      nzContent: ActiveCourseComponent,
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
            if (!(instance instanceof ActiveCourseComponent) ||
              instance.upgradeCourseForm.value.elearningId === null) {
              this.message.error('Khóa học cần kích hoạt không thể để trống!');
            } else {
              modal.triggerOk().then();
            }
          }
        }
      ],
      nzOnOk: instance => {
        const data = {...instance.upgradeCourseForm.value};
        delete data.name;
        this.eLearningStudentService.activeECourse(data).subscribe({
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
