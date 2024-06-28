import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CourseConst, ElearningType } from '../constant/report.const';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        private http: HttpClient,
    ) { }

    getReportFunnelCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/funnel-course-report', { params: option })
    }

    syncFunnelCourseData(): Observable<any> {
        return this.http.post('report/sync-funnel-course-report', {});
    }

    lstDropData(courseType: number): Observable<any> {
        return this.http.get(`course/list-data-drop-funnel-report`, { params: { courseType: courseType } });
    }

    lstDropElearningData(courseType: ElearningType): Observable<any> {
        return this.http.get(`courseelearning/list-data-drop-elearning-report`, { params: { type: courseType } });
    }

    getReportBigCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/big-course-report', { params: option })
    }

    syncBigCourseData(): Observable<any> {
        return this.http.post('report/sync-big-course-report', {});
    }

    syncElearningCourseData(type: ElearningType): Observable<any> {
        return this.http.post('report/sync-course-elearning-report', { params: { type: type } });
    }

    // khóa học miễn phí
    getReportFreeCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/free-course-report', { params: option })
    }

    // khóa học thành viên
    getReportMembershipCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/membership-course-report', { params: option })
    }

    // khóa học trả phí
    getReportPaidCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/paid-course-report', { params: option })
    }

      // báo cáo khóa học cộng tác viên
    getReportCollaboratorCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/collaborator-course-report', { params: option })
    }

    // báo cáo khóa học giảng viên
    getReportInstructorCourses(page?: any, pageSize?: any, filter?: any): Observable<any> {
        let option = {
            PageIndex: page,
            pageSize: pageSize,
        }

        if (filter) {
            option = {
                ...filter,
                PageIndex: page,
                pageSize: pageSize,
            }
        }
        return this.http.get('report/instructor-course-report', { params: option })
    }
}
