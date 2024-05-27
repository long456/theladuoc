import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, combineLatest, delay, map, mergeMap, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {LandingPageService} from "../../services/landing-page.service";
import {AttachTicketComponent} from "../../../register-form/components/attach-ticket/attach-ticket.component";
import {AttachClassComponent} from "../attach-class/attach-class.component";
import {ClassService} from "../../../class/services/class.service";
import {AttachFormComponent} from "../attach-form/attach-form.component";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  landingPage$ !: Observable<{
    rows: any[],
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  COL_DATA_TYPE = COL_DATA_TYPE;

  itemSelectList = [];

  loading = false;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  constructor(
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService,
    private landingPageService: LandingPageService,
    private viewContainerRef: ViewContainerRef,
    private classService: ClassService,
  ) {}

  ngOnInit() {
    this.landingPage$ = combineLatest([
      this.page$,
      this.pageSize$,
    ])
      .pipe(
        tap(() => this.loading = true),
        mergeMap(([page, pageSize]) => {
          return this.landingPageService.getListLandingPage(page, pageSize)
            .pipe(
              map((value) => {
                return {
                  rows: value.data.landingPageList,
                  page: value.data.paginationInfo.pageCurrent,
                  pageSize: value.data.paginationInfo.pageSize,
                  rowTotal: value.data.paginationInfo.totalItem,
                }
              })
            )
        }),
        delay(200),
        tap(() => this.loading = false),
      )
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  create() {
    this.router.navigate(['/page/setting/landing-page/create'])
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.landingPageService.softDeleteLandingPage(this.itemSelectList)
            .pipe(
            ).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.pageSize$.next(10)
              } else {
                this.message.error(value.errorMessages)
              }
            },
            error: err => {
              this.message.error(err.error);
            }
          })
        }
      });
    }
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/landing-page/' + data.id])
  }

  attachClass(data: any) {
    this.modal.create<AttachClassComponent>({
      nzTitle: 'Gắn Lớp',
      nzContent: AttachClassComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: data,
      nzFooter: null,
    });

    this.modal.afterAllClose.subscribe({
      next: value => {
        this.pageSize$.next(10)
      }
    })
  }

  removeClass(data: any) {
    const landingPageId = {
      landingPageId : data.id
    }
    this.classService.removeLandingPage(landingPageId).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
          this.pageSize$.next(10)
        } else {
          this.message.error(res.errorMessages)
        }
      },
      error: err => {
        this.message.error(err)
      }
    })
  }

  attachForm(data: any) {
    this.modal.create<AttachFormComponent>({
      nzTitle: 'Gắn Form',
      nzContent: AttachFormComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: data,
      nzFooter: null,
    });

    this.modal.afterAllClose.subscribe({
      next: value => {
        this.pageSize$.next(10)
      }
    })
  }

}
