import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseConst, ElearningType, FILTER_DATA_SEARCH, LST_QUARTER_OF_YEAR } from '../../constant/report.const';
import { DateTimeHelper } from '../../helper/date-time-helper';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ReportService } from '../../service/report.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpinnerService } from 'src/app/shared/services/spinner-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { plainToClass } from 'class-transformer';
import { FilterFunnelCourseReportComponent } from '../../funnel-report/dialog/filter-funnel-course-report/filter-funnel-course-report.component';
import { FreeCourseModelResponse } from '../../model/course-elearning-reponse';
import { finalize } from 'rxjs';
import { FilterElearningCourseReportComponent } from '../../funnel-report/dialog/filter-elearning-course-report/filter-elearning-course-report.component';

@Component({
  selector: 'app-report-free-course',
  templateUrl: './report-free-course.component.html',
  styleUrls: ['./report-free-course.component.scss']
})
export class ReportFreeCourseComponent {
  dateFormat = 'dd/MM/yyyy';
  monthFormat = 'MM/yyyy';
  items: FreeCourseModelResponse[] = [];
  expandSet = new Set<number>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItem: number = 0;
  isLoading: boolean = false;
  filter: any = {};

  myForm = new FormGroup({
    dateTimeTypeSearchCtrl: new FormControl(null),
    startCtrl: new FormControl(null),
    endCtrl: new FormControl(null),
    quarterOfYearCtrl: new FormControl(null),
    dateTimeRangeCtrl: new FormControl(null),
    monthCtrl: new FormControl(null),
    yearCtrl: new FormControl(null),
    quarterYearCtrl: new FormControl(null),
  });

  ctrls = this.myForm.controls;

  filterDataSearch = FILTER_DATA_SEARCH;
  lstQuarterOfYear = LST_QUARTER_OF_YEAR;

  constructor(private reportService: ReportService,
    private dateTimeHelper: DateTimeHelper,
    private modal: NzModalService,
    private message: NzMessageService,
    private spinnerService: SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.syncData();
  }

  resetForm() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.onSearch();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.onSearch(sortField, sortOrder);
  }

  getFilterDateTime() {
    let result = {};
    if (this.ctrls.quarterOfYearCtrl.value) {
      if (this.ctrls.quarterYearCtrl.value) {
        let dateQuarterYear = this.ctrls.quarterYearCtrl.value as Date;
        result = this.dateTimeHelper.getQuarterOfYear(this.ctrls.quarterOfYearCtrl.value, dateQuarterYear.getFullYear());
      } else {
        result = this.dateTimeHelper.getQuarterOfYear(this.ctrls.quarterOfYearCtrl.value);
      }
    }

    if (this.ctrls.dateTimeRangeCtrl.value) {
      result = this.dateTimeHelper.getDateTimeByDay(this.ctrls.dateTimeRangeCtrl.value[0], this.ctrls.dateTimeRangeCtrl.value[1]);
    }
    if (this.ctrls.monthCtrl.value) {
      let dateMonth = this.ctrls.monthCtrl.value as Date;
      result = this.dateTimeHelper.getDateTimeByMonth(dateMonth.getMonth(), dateMonth.getFullYear());
    }
    if (this.ctrls.yearCtrl.value) {
      let dateYear = this.ctrls.yearCtrl.value as Date;
      result = this.dateTimeHelper.getDateTimeByYear(dateYear.getFullYear());
    }

    return result;
  }

  openSearch() {
    this.filter = {};
    this.filter = {
      ...this.getFilterDateTime()
    };

    this.reportService.getReportFreeCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFreeCourse.map((z: any) => plainToClass(FreeCourseModelResponse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  openFilter() {
    this.ctrls.dateTimeTypeSearchCtrl.reset();
    const modal: NzModalRef = this.modal.create<FilterElearningCourseReportComponent>({
      nzTitle: 'Tìm kiếm khóa học miễn phí',
      nzContent: FilterElearningCourseReportComponent,
      nzFooter: null,
      nzWidth: '35%',
      nzData: {
        filter: this.filter,
        courseType: ElearningType.FREE
      },
      nzMaskClosable: false
    });

    modal.afterClose.subscribe(x => {
      if (x) {
        this.filter = { ...x };
      } else if (x == 0) {
        this.filter = {};
      }
      this.onSearch();
    })
  }

  syncData() {
    this.spinnerService.showLoading();
    this.reportService.syncElearningCourseData(ElearningType.FREE).pipe(finalize(() => {
      this.spinnerService.hideLoading();
    })).subscribe(x => {
      if (x.success == true) {
        this.message.success(x.messages);
      } else {
        this.message.error(x.errorMessages);
      }
      this.filter = {};
      this.onSearch();
    });
  }

  onSearch(sortField: string | null = null, sortOrder: string | null = null) {
    this.isLoading = true;

    if (sortField && sortOrder) {
      this.filter.sortBy = `${sortField}-${sortOrder}`;
    } else {
      delete this.filter.sortBy;
    }

    this.reportService.getReportFreeCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFreeCourse.map((z: any) => plainToClass(FreeCourseModelResponse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  onSeeProcess() {
    this.message.error('Chức năng này hiện chưa hoàn thiện, xin vui lòng thử lại sau!')
  }

  onSeeRanking() {
    this.message.error('Chức năng này hiện chưa hoàn thiện, xin vui lòng thử lại sau!')
  }

  onPageChange(page: any) {
    this.currentPage = page;
    this.onSearch();
  }

  nzPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.onSearch();
  }
}
