import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCollaboratorCourseComponent } from './elearning-report/report-collaborator-course/report-collaborator-course.component';
import { ReportFreeCourseComponent } from './elearning-report/report-free-course/report-free-course.component';
import { ReportInstructorCourseComponent } from './elearning-report/report-instructor-course/report-instructor-course.component';
import { ReportMemberShipCourseComponent } from './elearning-report/report-member-ship-course/report-member-ship-course.component';
import { ReportPaidCourseComponent } from './elearning-report/report-paid-course/report-paid-course.component';
import { ReportBigCourseComponent } from './funnel-report/report-big-course/report-big-course.component';
import { ReportFunnelCourseComponent } from './funnel-report/report-funnel-course/report-funnel-course.component';
import { SpeakerReportComponent } from './speaker-report/speaker-report.component';
import { StaffSalesReportComponent } from './staff-sales-report/staff-sales-report.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'report',
  },
  { path: 'report-funnel-course', component: ReportFunnelCourseComponent, },
  { path: 'report-big-course', component: ReportBigCourseComponent, },
  { path: 'report-paid-course', component: ReportPaidCourseComponent, },
  { path: 'report-member-course', component: ReportMemberShipCourseComponent, },
  { path: 'report-instructor-course', component: ReportInstructorCourseComponent, },
  { path: 'report-free-course', component: ReportFreeCourseComponent, },
  { path: 'report-collaborator-course', component: ReportCollaboratorCourseComponent, },
  { path: 'report-speaker', component: SpeakerReportComponent, },
  { path: 'report-sales-staff', component: StaffSalesReportComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
