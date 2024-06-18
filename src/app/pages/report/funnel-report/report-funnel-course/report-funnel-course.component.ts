import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { ReportFunnelCourse } from '../../model/report-funnel-course';
import { ReportFunnelService } from '../../service/report-funnel.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateTimeTypeSearch, QuarterOfYear } from '../../constant/date-time-type-search.const';
import { DateTimeHelper } from '../../helper/date-time-helper';

@Component({
  selector: 'app-report-funnel-course',
  templateUrl: './report-funnel-course.component.html',
  styleUrls: ['./report-funnel-course.component.scss']
})
export class ReportFunnelCourseComponent implements OnInit {
  items: ReportFunnelCourse[] = [];
  mode = '';
  isExpand: boolean = false;
  expandSet = new Set<number>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItem: number = 0;
  isLoading: boolean = false;
  myForm = new FormGroup({
    dateTimeTypeSearchCtrl: new FormControl(null),
    startCtrl: new FormControl(null),
    endCtrl: new FormControl(null),
    classIdCtrl: new FormControl(null),
    quarterOfYearCtrl: new FormControl(null),
    dateTimeRangeCtrl: new FormControl(null),
    monthCtrl: new FormControl(null),
    yearCtrl: new FormControl(null),
    classNameCtrl: new FormControl(null)
  });
  ctrl = this.myForm.controls;
  filterDataSearch = [
    { value: DateTimeTypeSearch.SEARCH_BY_DAY, label: 'Theo ngày' },
    { value: DateTimeTypeSearch.SEARCH_BY_MONTH, label: 'Theo tháng' },
    { value: DateTimeTypeSearch.SEARCH_BY_QUARTER, label: 'Theo quý' },
    { value: DateTimeTypeSearch.SEARCH_BY_YEAR, label: 'Theo năm' }
  ]

  lstQuarterOfYear = [
    { value: QuarterOfYear.QUY_1, label: 'Quý 1' },
    { value: QuarterOfYear.QUY_2, label: 'Quý 2' },
    { value: QuarterOfYear.QUY_3, label: 'Quý 3' },
    { value: QuarterOfYear.QUY_4, label: 'Quý 4' }
  ]

  constructor(private reportFunnelService: ReportFunnelService,
    private dateTimeHelper: DateTimeHelper,
  ) {
  }

  ngOnInit(): void {
    this.ctrl.dateTimeTypeSearchCtrl.valueChanges.subscribe(x => {
      this.ctrl.dateTimeRangeCtrl.reset();
      this.ctrl.monthCtrl.reset();
      this.ctrl.yearCtrl.reset();
      this.ctrl.quarterOfYearCtrl.reset();
    })
    this.onSearch();
  }

  resetForm() {
    this.myForm.reset();
    this.currentPage = 1;
    this.pageSize = 10;
    this.onSearch();
  }

  getFilterDateTime() {
    let result = {};
    if (this.ctrl.quarterOfYearCtrl.value) {
      result = this.dateTimeHelper.getQuarterOfYear(this.ctrl.quarterOfYearCtrl.value);
    }

    if (this.ctrl.dateTimeRangeCtrl.value) {
      result = this.dateTimeHelper.getDateTimeByDay(this.ctrl.dateTimeRangeCtrl.value[0], this.ctrl.dateTimeRangeCtrl.value[1]);
    }
    if (this.ctrl.monthCtrl.value) {
      let dateMonth = this.ctrl.monthCtrl.value as Date;
      result = this.dateTimeHelper.getDateTimeByMonth(dateMonth.getMonth(), dateMonth.getFullYear());
    }
    if (this.ctrl.yearCtrl.value) {
      let dateYear = this.ctrl.yearCtrl.value as Date;
      result = this.dateTimeHelper.getDateTimeByYear(dateYear.getFullYear());
    }

    return result;
  }

  onSearch() {
    this.isLoading = true;
    let filter: any = {
      ...this.getFilterDateTime(),
    }
    if (this.ctrl.classNameCtrl.value) {
      filter.className = this.ctrl.classNameCtrl.value
    }

    this.reportFunnelService.getReportFunnelCourses(this.currentPage, this.pageSize, filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFunnelCourses.map((z: any) => plainToClass(ReportFunnelCourse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  onPageChange(page: any) {
    this.currentPage = page;
    this.onSearch();
  }

  nzPageSizeChange(pageSize: number) {
    console.log(pageSize);
    this.pageSize = pageSize;
    this.onSearch();
  }

  getLimit() {

  }


}
