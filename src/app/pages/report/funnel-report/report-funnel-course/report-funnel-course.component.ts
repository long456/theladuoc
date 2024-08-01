import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { ReportFunnelCourse } from '../../model/report-funnel-course';
import { DateTimeTypeSearch, QuarterOfYear } from '../../constant/date-time-type-search.const';
import { DateTimeHelper } from '../../helper/date-time-helper';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FilterFunnelCourseReportComponent } from '../dialog/filter-funnel-course-report/filter-funnel-course-report.component';
import { CreateLessonComponent } from 'src/app/pages/class/components/create-lesson/create-lesson.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpinnerService } from 'src/app/shared/services/spinner-service';
import { CourseConst, FILTER_DATA_SEARCH, LST_QUARTER_OF_YEAR } from '../../constant/report.const';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from '../../service/report.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-report-funnel-course',
  templateUrl: './report-funnel-course.component.html',
  styleUrls: ['./report-funnel-course.component.scss']
})
export class ReportFunnelCourseComponent implements OnInit {
  dateFormat = 'dd/MM/yyyy';
  monthFormat = 'MM/yyyy';
  items: ReportFunnelCourse[] = [];
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
    dateTimeRangeCtrl: new FormControl([] as any),
    monthCtrl: new FormControl(null as any),
    yearCtrl: new FormControl(null as any),
    quarterYearCtrl: new FormControl(null as any),
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
    this.ctrls.dateTimeTypeSearchCtrl.valueChanges.subscribe(x => {
      this.ctrls.dateTimeRangeCtrl.reset();
      this.ctrls.monthCtrl.reset();
      this.ctrls.yearCtrl.reset();
      this.ctrls.quarterOfYearCtrl.reset();
    });
    // this.syncData();
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
      if (this.ctrls.quarterYearCtrl.value != null && this.ctrls.quarterYearCtrl.value != undefined) {
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
    this.isLoading = true;
    this.reportService.getReportFunnelCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFunnelCourses.map((z: any) => plainToClass(ReportFunnelCourse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  openFilter() {
    // this.resetForm();
    this.filter = {
      ...this.filter,
      ...this.getFilterDateTime()
    };
    const modal: NzModalRef = this.modal.create<FilterFunnelCourseReportComponent>({
      nzTitle: 'Tìm kiếm khóa học phễu',
      nzContent: FilterFunnelCourseReportComponent,
      nzFooter: null,
      nzWidth: '35%',
      nzData: {
        filter: this.filter,
        courseType: CourseConst.FUNNEL_COURSE,
        dateTimeTypeSearch: this.ctrls.dateTimeTypeSearchCtrl.value,
        quarterOfYear: this.ctrls.quarterOfYearCtrl.value
      },
      nzMaskClosable: false
    });

    modal.afterClose.subscribe(x => {
      if (x) {
        this.filter = { ...x.dataFilter };
        this.ctrls.dateTimeTypeSearchCtrl.setValue(x.dateTimeTypeSearch);
        if (this.ctrls.dateTimeTypeSearchCtrl.value == DateTimeTypeSearch.SEARCH_BY_DAY) {
          if (x.dataFilter.start || x.dataFilter.end) {
            let [dayStart, monthStart, yearStart] = x.dataFilter.start.split('/');
            let [dayEnd, monthEnd, yearEnd] = x.dataFilter.end.split('/');
            this.ctrls.dateTimeRangeCtrl.setValue([new Date(`${yearStart}-${monthStart}-${dayStart}`), new Date(`${yearEnd}-${monthEnd}-${dayEnd}`)]);
          }
        } else if (this.ctrls.dateTimeTypeSearchCtrl.value == DateTimeTypeSearch.SEARCH_BY_MONTH) {
          if (x.dataFilter.start) {
            let [dayStart, monthStart, yearStart] = x.dataFilter.start.split('/');
            this.ctrls.monthCtrl.setValue(new Date(`${yearStart}-${monthStart}-${dayStart}`));
          }
        } else if (this.ctrls.dateTimeTypeSearchCtrl.value == DateTimeTypeSearch.SEARCH_BY_QUARTER) {
          if (x.dataFilter.start) {
            let [dayStart, monthStart, yearStart] = x.dataFilter.start.split('/');
            this.ctrls.quarterYearCtrl.setValue(new Date(`${yearStart}-${monthStart}-${dayStart}`));
          }

          if (x.quarterOfYear) {
            this.ctrls.quarterOfYearCtrl.setValue(x.quarterOfYear);
          }
        } else if (this.ctrls.dateTimeTypeSearchCtrl.value == DateTimeTypeSearch.SEARCH_BY_YEAR) {
          if (x.dataFilter.start) {
            let [dayStart, monthStart, yearStart] = x.dataFilter.start.split('/');
            this.ctrls.yearCtrl.setValue(new Date(`${yearStart}-${monthStart}-${dayStart}`));
          }
        }

        this.filter = { ...x.dataFilter, ...this.getFilterDateTime() };
        this.onSearch();
      } else if (x == 0) {
        this.filter = {};
        this.onSearch();
      }
    })
  }

  syncData() {
    this.spinnerService.showLoading();
    this.reportService.syncFunnelCourseData().pipe(finalize(() => {
      this.spinnerService.hideLoading();
    })).subscribe(x => {
      if (x.success == true) {
        this.message.success("Đồng bộ dữ liệu thành công");
      } else {
        this.message.success("Đồng bộ dữ liệu thất bại");
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

    this.reportService.getReportFunnelCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFunnelCourses.map((z: any) => plainToClass(ReportFunnelCourse, z));
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
