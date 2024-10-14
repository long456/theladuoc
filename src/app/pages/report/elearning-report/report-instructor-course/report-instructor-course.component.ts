import { Component } from '@angular/core';
import { InstructorCourseModelResponse } from '../../model/course-elearning-reponse';
import { FormControl, FormGroup } from '@angular/forms';
import { ElearningType, FILTER_DATA_SEARCH, LST_QUARTER_OF_YEAR } from '../../constant/report.const';
import { ReportService } from '../../service/report.service';
import { DateTimeHelper } from '../../helper/date-time-helper';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpinnerService } from 'src/app/shared/services/spinner-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { plainToClass } from 'class-transformer';
import { FilterElearningCourseReportComponent } from '../../funnel-report/dialog/filter-elearning-course-report/filter-elearning-course-report.component';
import { finalize } from 'rxjs';
import { DateTimeTypeSearch } from '../../constant/date-time-type-search.const';
import { ListStudentDialogComponent } from '../list-student-dialog/list-student-dialog.component';

@Component({
  selector: 'app-report-instructor-course',
  templateUrl: './report-instructor-course.component.html',
  styleUrls: ['./report-instructor-course.component.scss']
})
export class ReportInstructorCourseComponent {
  dateFormat = 'dd/MM/yyyy';
  monthFormat = 'MM/yyyy';
  items: InstructorCourseModelResponse[] = [];
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

  openListStudentsDialog(countStudents?: number, courseElearningId?: number,
    numberOfLearners100Percent: boolean = false,
    numberOfLearners90Percent: boolean = false,
    numberOfLearners75Percent: boolean = false,
    numberOfLearners50Percent: boolean = false,
    numberOfLearners25Percent: boolean = false,
    numberOfLearners5Percent: boolean = false) {

    if (countStudents == 0) {
      this.message.warning("Không có học viên hợp lệ.");
      return;
    }

    let title = "Số người đăng ký khóa học giảng viên"
    if (numberOfLearners100Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 100%"
    } else if (numberOfLearners90Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 90%"
    }
    else if (numberOfLearners75Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 75%"
    }
    else if (numberOfLearners50Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 50%"
    }
    else if (numberOfLearners25Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 25%"
    }
    else if (numberOfLearners5Percent == true) {
      title = "Số học viên hoàn thành khóa học giảng viên 5%"
    }

    const modal: NzModalRef = this.modal.create<ListStudentDialogComponent>({
      nzTitle: title,
      nzContent: ListStudentDialogComponent,
      nzFooter: null,
      nzWidth: '60%',
      nzData: {
        courseElearningId: courseElearningId,
        numberOfLearners100Percent: numberOfLearners100Percent,
        numberOfLearners90Percent: numberOfLearners90Percent,
        numberOfLearners75Percent: numberOfLearners75Percent,
        numberOfLearners50Percent: numberOfLearners50Percent,
        numberOfLearners25Percent: numberOfLearners25Percent,
        numberOfLearners5Percent: numberOfLearners5Percent,
      },
      nzMaskClosable: false
    });
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

    this.reportService.getReportInstructorCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportInstructorCourse.map((z: any) => plainToClass(InstructorCourseModelResponse, z));
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
    const modal: NzModalRef = this.modal.create<FilterElearningCourseReportComponent>({
      nzTitle: 'Tìm kiếm khóa học giảng viên',
      nzContent: FilterElearningCourseReportComponent,
      nzFooter: null,
      nzWidth: '35%',
      nzData: {
        filter: this.filter,
        courseType: ElearningType.LECTURER,
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
    this.reportService.syncElearningCourseData(ElearningType.LECTURER).pipe(finalize(() => {
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

    this.reportService.getReportInstructorCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportInstructorCourse.map((z: any) => plainToClass(InstructorCourseModelResponse, z));
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
