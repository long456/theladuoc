import {Component, OnInit} from '@angular/core';
import {COL_DATA_TYPE} from "../../../../shared/models/Table";
import {BehaviorSubject, combineLatest, delay, map, mergeMap, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {LandingPageService} from "../../services/landing-page.service";

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
    private landingPageService: LandingPageService
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

  }

  delete() {

  }

  edit(data: any) {

  }
}
