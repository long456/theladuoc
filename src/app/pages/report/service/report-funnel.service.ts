import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CourseConst } from '../constant/report.const';

@Injectable({
    providedIn: 'root'
})
export class ReportFunnelService {

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

    syncData(): Observable<any> {
        return this.http.post('report/sync-funnel-course-report', {});
    }

    lstClassData(): Observable<any> {
        return this.http.get(`class/list-class-by-course-type`, { params: { courseType: CourseConst.FUNNEL_COURSE } });
    }

    lstCourseData(): Observable<any> {
        return this.http.get(`course/list-course-funnel-type`, { params: { courseType: CourseConst.FUNNEL_COURSE } });
    }
}
