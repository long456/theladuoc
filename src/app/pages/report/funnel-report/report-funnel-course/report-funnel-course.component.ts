import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { ReportFunnelCourse } from '../../model/report-funnel-course';
import { ReportFunnelService } from '../../service/report-funnel.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateTimeTypeSearch, QuarterOfYear } from '../../constant/date-time-type-search.const';
import { DateTimeHelper } from '../../helper/date-time-helper';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FilterFunnelCourseReportComponent } from '../dialog/filter-funnel-course-report/filter-funnel-course-report.component';
import { CreateLessonComponent } from 'src/app/pages/class/components/create-lesson/create-lesson.component';

@Component({
  selector: 'app-report-funnel-course',
  templateUrl: './report-funnel-course.component.html',
  styleUrls: ['./report-funnel-course.component.scss']
})
export class ReportFunnelCourseComponent implements OnInit {
  items: ReportFunnelCourse[] = [];
  expandSet = new Set<number>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItem: number = 0;
  isLoading: boolean = false;
  filter: any = {};
  constructor(private reportFunnelService: ReportFunnelService,
    private dateTimeHelper: DateTimeHelper,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.onSearch();
  }

  resetForm() {
    // this.myForm.reset();
    this.currentPage = 1;
    this.pageSize = 10;
    this.onSearch();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.onSearch(sortField, sortOrder);
  }

  openSearch() {
    const modal: NzModalRef = this.modal.create<FilterFunnelCourseReportComponent>({
      nzTitle: 'Tìm kiếm khóa học phễu',
      nzContent: FilterFunnelCourseReportComponent,
      nzFooter: null,
      nzWidth: '30%',
      nzMaskClosable: false
    });

    modal.afterClose.subscribe(x => {
      if (x) {
        this.filter = { ...x };
        this.onSearch();
      }
    })
  }

  syncData() {
    this.reportFunnelService.syncData();
  }

  getFilterDateTime(quarterOfYearCtrl: any, dateTimeRangeCtrl: any, monthCtrl: any, yearCtrl: any) {
    let result = {};
    if (quarterOfYearCtrl) {
      result = this.dateTimeHelper.getQuarterOfYear(quarterOfYearCtrl);
    }

    if (dateTimeRangeCtrl) {
      result = this.dateTimeHelper.getDateTimeByDay(dateTimeRangeCtrl[0], dateTimeRangeCtrl[1]);
    }
    if (monthCtrl) {
      let dateMonth = monthCtrl as Date;
      result = this.dateTimeHelper.getDateTimeByMonth(dateMonth.getMonth(), dateMonth.getFullYear());
    }
    if (yearCtrl) {
      let dateYear = yearCtrl as Date;
      result = this.dateTimeHelper.getDateTimeByYear(dateYear.getFullYear());
    }

    return result;
  }

  onSearch(sortField: string | null = null, sortOrder: string | null = null) {
    this.isLoading = true;

    // if (this.ctrl.classNameCtrl.value) {
    //   filter.className = this.ctrl.classNameCtrl.value
    // }

    if (sortField && sortOrder) {
      this.filter.sortBy = `${sortField}-${sortOrder}`;
    }

    this.reportFunnelService.getReportFunnelCourses(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportFunnelCourses.map((z: any) => plainToClass(ReportFunnelCourse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  onPageChange(page: any) {
    this.currentPage = page;
    this.onSearch();
  }

  nzPageSizeChange(pageSize: number) {
    // console.log(pageSize);
    this.pageSize = pageSize;
    this.onSearch();
  }
}
