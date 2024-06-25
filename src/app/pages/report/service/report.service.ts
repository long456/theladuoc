import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CourseConst } from '../constant/report.const';

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
}