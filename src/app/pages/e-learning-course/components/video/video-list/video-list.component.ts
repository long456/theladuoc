import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  itemSelectList: number[] = [];
  loading = false;
  eCourseId!: number;

  videoPage$ !: Observable<{
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
    private route: ActivatedRoute,
    private modal :NzModalService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.route.params.pipe().subscribe(params => {
      const {courseId} = params;
      this.eCourseId = courseId;
    });

    this.videoPage$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.videoService.getVideoList(this.eCourseId, page, pageSize, filter)
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
              this.message.error('Lỗi load dữ danh sách video');
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

  backToCourse() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/e-course-list']);
    }
  }

  navigationToChapter() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/chapter/'+ this.eCourseId + '/list']);
    }
  }

  getItemSelection(e: any) {
    this.itemSelectList = e;
  }

  create() {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/video/'+ this.eCourseId + '/' + '/create']);
    }
  }

  edit(data: any) {
    if (this.eCourseId) {
      this.router.navigate(['page/e-course/video/'+ this.eCourseId + '/' + data.id]);
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
          this.videoService.softDeleteVideo(this.itemSelectList)
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
