import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ChapterService} from "../../../services/chapter.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit{

  COL_DATA_TYPE = COL_DATA_TYPE;
  itemSelectList: number[] = [];
  loading = false;
  eCourseId!: number;

  chapterPage$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  constructor(
    private router: Router,
    private message: NzMessageService,
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private modal :NzModalService,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe().subscribe(params => {
      const {courseId} = params;
      this.eCourseId = courseId;
    });

    this.chapterPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.chapterService.getChapterList(this.eCourseId, page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.elearnings,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu học phần')
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

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  backToCourse() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/e-course-list']);
    }
  }

  navigationToVideo() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/video/'+ this.eCourseId + '/list']);
    }
  }

  create() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/chapter/'+ this.eCourseId + '/create']);
    }
  }

  edit(data: any) {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/chapter/'+ this.eCourseId + '/' + data.id]);
    }
  }

  delete() {
    if (this.itemSelectList.length === 0) {
      this.message.error('Chưa có mục nào được chọn')
    } else {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa những mục đã chọn ?',
        nzOnOk: () => {
          this.chapterService.softDeleteChapter(this.itemSelectList)
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
