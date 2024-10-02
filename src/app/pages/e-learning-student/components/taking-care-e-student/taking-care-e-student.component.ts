import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, FIX_COLUMN, filterItem, FilterType} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningStudentService} from "../../services/e-learning-student.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActiveCourseComponent} from "../active-course/active-course.component";
import {ActiveCourseService} from "../../services/active-course.service";
import {AuthService} from "../../../../layouts/auth-layout/auth/services/auth.service";
import {ActiveMembershipService} from "../../services/active-membership.service";
import {AddAgencyService} from "../../services/add-agency.service";

@Component({
  selector: 'app-taking-care-e-student',
  templateUrl: './taking-care-e-student.component.html',
  styleUrls: ['./taking-care-e-student.component.scss']
})
export class TakingCareEStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  takingCareEStudent$!: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  loading = false;

  isExpand = false;
  listOfColumn: filterItem[] = [
    FilterType['fullName'],
    FilterType['mobile'],
    FilterType['email'],
    FilterType['studentCode'],
    FilterType['caregiverName'],
    FilterType['userRefName'],
  ];
  constructor(
    private router: Router,
    private message: NzMessageService,
    private eLearningStudentService: ELearningStudentService,
    private modal: NzModalService,
    private activeCourseService: ActiveCourseService,
    private authService: AuthService,
    private activeMembershipService: ActiveMembershipService,
    private addAgencyService: AddAgencyService
  ) {}

  ngOnInit() {
    this.takingCareEStudent$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.eLearningStudentService.getTakingCareEStudent(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.users,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu học viên đang chăm');
              return of({
                rows: [],
                page: 0,
                pageSize: 0,
                rowTotal: 0
              });
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    );
  }

  activeCourse(data: any): void{
    this.activeCourseService.activeCourse(data);
  }

  activeMembership(data: any): void{
    this.activeMembershipService.giftMembership(data);
  }

  addAgency(data: any): void{
    this.addAgencyService.addAgency(data);
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }
}
