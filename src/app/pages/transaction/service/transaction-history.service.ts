import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransactionHistoryService {

    constructor(
        private http: HttpClient,
    ) { }

    getTransactionHistory(page?: any, pageSize?: any, filter?: any): Observable<any> {
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
        return this.http.get('transactionHistory', { params: option })
    }

    lstDropData(): Observable<any> {
        return this.http.get(`transactionHistory/list-common-drop`);
    }
}
