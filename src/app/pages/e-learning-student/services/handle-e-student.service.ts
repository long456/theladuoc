import { Injectable } from '@angular/core';
import {ELearningStudentService} from "./e-learning-student.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandleEStudentService {
  private handleStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  status$ = this.handleStatus.asObservable();

  constructor(
    private eLearningStudentService: ELearningStudentService,
    private message: NzMessageService,
  ) { }

  getHandleStatus(): boolean{
    return this.handleStatus.getValue();
  }

  changeStatusSuccess():void{
    this.handleStatus.next(true);
  }

  changeStatusError():void{
    this.handleStatus.next(false);
  }

  takeCareStudent(listId: number[]):void{
    if (listId.length === 0) {
      this.message.error('Chưa có học viên nào được chọn!');
    } else {
      let data = JSON.stringify(listId);
      this.eLearningStudentService.receiveCareUser(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success(res.messages);
            this.changeStatusSuccess();
          } else {
            this.message.error(res.errorMessages);
          }
        }
      });
    }
  }

  refuseCareStudent(listId: number[]):void{
    if (listId.length === 0) {
      this.message.error('Chưa có học viên nào được chọn!');
    } else {
      let data = JSON.stringify(listId);
      this.eLearningStudentService.refuseCareUser(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success(res.messages);
            this.changeStatusSuccess();
          } else {
            this.message.error(res.errorMessages);
          }
        }
      });
    }
  }
}
