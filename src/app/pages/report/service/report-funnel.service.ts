import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
}
