import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserControlService} from "../../services/user-control.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {
  BehaviorSubject,
  Observable,
  Subscription,
} from "rxjs";
import {UserData} from "../../models/UserData";
import {COL_DATA_TYPE} from "../../../../shared/models/Table";


interface PaginatedResponse {
  rows: any[];
  page: number;
  pageSize: number;
  rowTotal: number;
}

@Component({
  selector: 'app-learning-process',
  templateUrl: './learning-process.component.html',
  styleUrls: ['./learning-process.component.scss']
})
export class LearningProcessComponent implements OnInit, OnDestroy {
  protected readonly COL_DATA_TYPE = COL_DATA_TYPE;
  private subscription: Subscription = new Subscription();
  currentUser!: UserData;
  currentSelection: number = 1;
  currentType: number = 1;
  funnelCourse$!: Observable<PaginatedResponse>;
  eLearning$!: Observable<PaginatedResponse>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filter$ = new BehaviorSubject(1);
  loading$ = new BehaviorSubject(false);

  constructor(
    private userControlService: UserControlService,
    private message: NzMessageService,
  ) {}

  ngOnInit():void {
    this.subscription = this.userControlService.data$.subscribe({
      next: data => {
        if (data) {
          this.currentUser = data;
          this.initFunnelCourse();
          this.initELearning();
        }
      }
    });
  }

  initFunnelCourse(): void {
    this.funnelCourse$ = this.userControlService.createPaginatedObservable(
      (page, pageSize, filter) => {
        return this.userControlService.getFunnelCourse(page, pageSize, filter);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
      'Lỗi load dữ liệu khóa học phễu',
      this.filter$
    );
  }

  initELearning(): void {
    this.eLearning$ = this.userControlService.createPaginatedObservable(
      (page, pageSize) => {
        return this.userControlService.getELearningCourse(page, pageSize);
      },
      this.page$,
      this.pageSize$,
      this.loading$,
      'Lỗi load dữ liệu khóa học E-learning'
    );
  }

  onSelect():void {
    this.page$.next(1);
    this.pageSize$.next(10);
  }

  onTypeChange(e: number):void{
    this.filter$.next(e);
    this.page$.next(1);
    this.pageSize$.next(10);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
