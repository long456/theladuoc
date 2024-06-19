import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DateTimeTypeSearch, QuarterOfYear } from '../../../constant/date-time-type-search.const';
import { DateTimeHelper } from '../../../helper/date-time-helper';

@Component({
  selector: 'app-filter-funnel-course-report',
  templateUrl: './filter-funnel-course-report.component.html',
  styleUrls: ['./filter-funnel-course-report.component.scss']
})
export class FilterFunnelCourseReportComponent {
  myForm = new FormGroup({
    dateTimeTypeSearchCtrl: new FormControl(null),
    startCtrl: new FormControl(null),
    endCtrl: new FormControl(null),
    classIdCtrl: new FormControl(null),
    quarterOfYearCtrl: new FormControl(null),
    dateTimeRangeCtrl: new FormControl(null),
    monthCtrl: new FormControl(null),
    yearCtrl: new FormControl(null),
    classNameCtrl: new FormControl(null),
    quarterYearCtrl: new FormControl(null),
    courseNameCtrl: new FormControl(null),
    speakerNameCtrl: new FormControl(null),
    phoneNumberCtrl: new FormControl(null),
    organizationNameCtrl: new FormControl(null),
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

  constructor(private dateTimeHelper: DateTimeHelper,
    private modal: NzModalRef<FilterFunnelCourseReportComponent>,) {

  }

  ngOnInit(): void {
    this.ctrl.dateTimeTypeSearchCtrl.valueChanges.subscribe(x => {
      this.ctrl.dateTimeRangeCtrl.reset();
      this.ctrl.monthCtrl.reset();
      this.ctrl.yearCtrl.reset();
      this.ctrl.quarterOfYearCtrl.reset();
    })
  }

  resetForm() {

  }

  onSave() {
    let dataFilter: any = {
      ...this.getFilterDateTime()
    };
    if (this.ctrl.speakerNameCtrl.value) {
      dataFilter.teacherName = this.ctrl.speakerNameCtrl.value;
    }
    if (this.ctrl.organizationNameCtrl.value) {
      dataFilter.organizationName = this.ctrl.organizationNameCtrl.value;
    }
    if (this.ctrl.courseNameCtrl.value) {
      dataFilter.title = this.ctrl.courseNameCtrl.value;
    }
    if (this.ctrl.phoneNumberCtrl.value) {
      dataFilter.phoneNumber = this.ctrl.phoneNumberCtrl.value;
    }
    this.modal.close(dataFilter)
  }

  getFilterDateTime() {
    let result = {};
    if (this.ctrl.quarterOfYearCtrl.value) {
      if (this.ctrl.quarterYearCtrl.value) {
        let dateQuarterYear = this.ctrl.quarterYearCtrl.value as Date;
        result = this.dateTimeHelper.getQuarterOfYear(this.ctrl.quarterOfYearCtrl.value, dateQuarterYear.getFullYear());
      } else {
        result = this.dateTimeHelper.getQuarterOfYear(this.ctrl.quarterOfYearCtrl.value);
      }
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
}
