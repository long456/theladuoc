import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {MembershipService} from "../../services/membership.service";

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  membership$ !: Observable<{
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
  itemSelectList: number[] = [];

  constructor(
    private router: Router,
    private message: NzMessageService,
    private membershipService: MembershipService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.membership$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.membershipService.getMembershipList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.listPolicy,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu danh sách hạng thành viên');
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
    )
  }

  create():void{
    this.router.navigate(['page/membership-policy/create']);
  }

  delete(data: any):void{
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa hạng thành viên này?',
      nzOnOk: () => {
        this.membershipService.softDeleteMembership(data.id)
          .pipe(
          ).subscribe({
          next: value => {
            if (value.success) {
              this.message.success(value.messages);
              this.pageSize$.next(10)
            } else {
              this.message.error(value.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        })
      }
    });
  }

  edit(data: any):void{
    this.router.navigate(['page/membership-policy/' + data.id]).then();
  }

  editOptionalCourse(data: any):void {
    this.router.navigate(['page/membership-policy/optional-courses/' + data.id]).then();
  }
}
