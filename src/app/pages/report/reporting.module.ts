import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportFunnelCourseComponent } from './funnel-report/report-funnel-course/report-funnel-course.component';
import { ReportBigCourseComponent } from './funnel-report/report-big-course/report-big-course.component';
import { ReportFreeCourseComponent } from './elearning-report/report-free-course/report-free-course.component';
import { ReportMemberShipCourseComponent } from './elearning-report/report-member-ship-course/report-member-ship-course.component';
import { ReportPaidCourseComponent } from './elearning-report/report-paid-course/report-paid-course.component';
import { ReportCollaboratorCourseComponent } from './elearning-report/report-collaborator-course/report-collaborator-course.component';
import { ReportInstructorCourseComponent } from './elearning-report/report-instructor-course/report-instructor-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import customViVn from 'src/app/custom-vi-vn';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FilterFunnelCourseReportComponent } from './funnel-report/dialog/filter-funnel-course-report/filter-funnel-course-report.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@NgModule({
  declarations: [
    ReportFunnelCourseComponent,
    ReportBigCourseComponent,
    ReportFreeCourseComponent,
    ReportMemberShipCourseComponent,
    ReportPaidCourseComponent,
    ReportCollaboratorCourseComponent,
    ReportInstructorCourseComponent,
    FilterFunnelCourseReportComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzSelectModule,
    NzCollapseModule,
    CKEditorModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzDatePickerModule,
    NzToolTipModule
  ],
})
export class ReportingModule { }
