import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {TestimonialService} from "../../services/testimonial.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  testimonialList$!: Observable<{
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
    private testimonialService: TestimonialService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.testimonialList$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.testimonialService.getTestimonialList(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.testimonialList,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu lời chứng thực');
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

  getItemSelection(e: any):void {
    this.itemSelectList = e;
  }

  create():void {
    this.router.navigate(['/page/testimonials/create']);
  }

  edit(data: any):void {
    this.router.navigate(['/page/testimonials/' + data.id]);
  }

  delete():void {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn');
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.testimonialService.softDeleteTestimonials(this.itemSelectList)
            .pipe(
            ).subscribe({
            next: value => {
              if (value.success) {
                this.message.success(value.messages);
                this.pageSize$.next(10);
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
  }
}
