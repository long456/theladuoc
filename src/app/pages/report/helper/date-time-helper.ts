import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { QuarterOfYear } from '../constant/date-time-type-search.const';
@Injectable({
    providedIn: 'root'
})
export class DateTimeHelper {
    constructor() {
    }

    getQuarterOfYear(quy: number, year?: number) {
        let result = {
            start: '',
            end: ''
        }
        let current = new Date();
        let yearCurrent = current.getFullYear();
        if (year) {
            yearCurrent = year;
        }
        switch (quy) {
            case QuarterOfYear.QUY_1:
                result.start = `01/01/${yearCurrent}`;
                result.end = moment(`03/01/${yearCurrent}`).endOf('month').format('DD/MM/YYYY');
                break;
            case QuarterOfYear.QUY_2:
                result.start = `01/04/${yearCurrent}`;
                result.end = moment(`06/01/${yearCurrent}`).endOf('month').format('DD/MM/YYYY');
                break;
            case QuarterOfYear.QUY_3:
                result.start = `01/07/${yearCurrent}`;
                result.end = moment(`09/01/${yearCurrent}`).endOf('month').format('DD/MM/YYYY');
                break;
            case QuarterOfYear.QUY_4:
                result.start = `01/10/${yearCurrent}`;
                result.end = moment(`12/01/${yearCurrent}`).endOf('month').format('DD/MM/YYYY');
                break;
        }
        return result;
    }

    getDateTimeByYear(year: any) {
        let result = {
            start: '',
            end: ''
        }

        if (year) {
            result.start = moment(`01/01/${year}`).startOf('month').format('DD/MM/YYYY');
            result.end = moment(`12/01/${year}`).endOf('month').format('DD/MM/YYYY');
        }

        return result;
    }

    getDateTimeByMonth(month: any, year: any) {
        let result = {
            start: '',
            end: ''
        }

        if (month != null && year != null) {
            result.start = moment(`${month + 1}/01/${year}`).startOf('month').format('DD/MM/YYYY');
            result.end = moment(`${month + 1}/01/${year}`).endOf('month').format('DD/MM/YYYY');
        }

        return result;
    }

    getDateTimeByDay(from?: any, to?: any) {
        let result = {
            start: '',
            end: ''
        }

        if (from) {
            result.start = moment(from).format('DD/MM/YYYY');
        }

        if (to) {
            result.end = moment(to).format('DD/MM/YYYY');
        }
        console.log(result);
        return result;
    }
}