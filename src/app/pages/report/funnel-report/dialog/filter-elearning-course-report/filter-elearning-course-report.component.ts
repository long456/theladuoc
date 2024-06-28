import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataDropResponse } from '../../../model/data-drop-response';
import { FILTER_DATA_SEARCH, LST_QUARTER_OF_YEAR } from '../../../constant/report.const';
import { DateTimeHelper } from '../../../helper/date-time-helper';
import { ReportService } from '../../../service/report.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-filter-elearning-course-report',
  templateUrl: './filter-elearning-course-report.component.html',
  styleUrls: ['./filter-elearning-course-report.component.scss']
})
export class FilterElearningCourseReportComponent {
  dateFormat = 'dd/MM/yyyy';
  monthFormat = 'MM/yyyy';
  myForm = new FormGroup({
    dateTimeTypeSearchCtrl: new FormControl(null),
    startCtrl: new FormControl(null),
    endCtrl: new FormControl(null),
    quarterOfYearCtrl: new FormControl(null),
    dateTimeRangeCtrl: new FormControl(null),
    monthCtrl: new FormControl(null),
    yearCtrl: new FormControl(null),
    quarterYearCtrl: new FormControl(null),
    courseNameCtrl: new FormControl(null),
    speakerNameCtrl: new FormControl(null),
    phoneNumberCtrl: new FormControl(null),
    organizationNameCtrl: new FormControl(null),
  });
  ctrl = this.myForm.controls;
  dropModel: DataDropResponse = new DataDropResponse();
  filterDataSearch = FILTER_DATA_SEARCH;
  lstQuarterOfYear = LST_QUARTER_OF_YEAR;

  constructor(private dateTimeHelper: DateTimeHelper,
    private modal: NzModalRef<FilterElearningCourseReportComponent>,
    private reportService: ReportService,
    @Inject(NZ_MODAL_DATA) public data: any
  ) {
    this.setFilter();
  }

  setFilter() {
    if (this.data.filter.courseId) {
      this.ctrl.courseNameCtrl.setValue(this.data.filter.courseId);
    }
    if (this.data.filter.teacherId) {
      this.ctrl.speakerNameCtrl.setValue(this.data.filter.teacherId);
    }
    if (this.data.filter.orgId) {
      this.ctrl.organizationNameCtrl.setValue(this.data.filter.orgId);
    }
    if (this.data.filter.phoneId) {
      this.ctrl.phoneNumberCtrl.setValue(this.data.filter.phoneId);
    }

  }

  ngOnInit(): void {
    this.ctrl.dateTimeTypeSearchCtrl.valueChanges.subscribe(x => {
      this.ctrl.dateTimeRangeCtrl.reset();
      this.ctrl.monthCtrl.reset();
      this.ctrl.yearCtrl.reset();
      this.ctrl.quarterOfYearCtrl.reset();
    });
    this.reportService.lstDropElearningData(this.data.courseType).subscribe(x => {
      if (x.data) {
        this.dropModel = plainToClass(DataDropResponse, x.data);
      }
    });
  }

  resetForm() {
    this.modal.close(0);
  }

  onSave() {
    let dataFilter: any = {
      ...this.getFilterDateTime()
    };
    if (this.ctrl.speakerNameCtrl.value) {
      dataFilter.teacherId = this.ctrl.speakerNameCtrl.value;
    }
    if (this.ctrl.organizationNameCtrl.value) {
      dataFilter.orgId = this.ctrl.organizationNameCtrl.value;
    }
    if (this.ctrl.courseNameCtrl.value) {
      dataFilter.courseId = this.ctrl.courseNameCtrl.value;
    }
    if (this.ctrl.phoneNumberCtrl.value) {
      dataFilter.phoneId = this.ctrl.phoneNumberCtrl.value;
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
