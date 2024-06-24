import { DateTimeTypeSearch, QuarterOfYear } from "./date-time-type-search.const"

export const CourseConst = {
    FUNNEL_COURSE: 1,
    BIG_COURSE: 2
}

export const FILTER_DATA_SEARCH = [
    { value: DateTimeTypeSearch.SEARCH_BY_DAY, label: 'Theo ngày' },
    { value: DateTimeTypeSearch.SEARCH_BY_MONTH, label: 'Theo tháng' },
    { value: DateTimeTypeSearch.SEARCH_BY_QUARTER, label: 'Theo quý' },
    { value: DateTimeTypeSearch.SEARCH_BY_YEAR, label: 'Theo năm' }
]

export const LST_QUARTER_OF_YEAR = [
    { value: QuarterOfYear.QUY_1, label: 'Quý 1' },
    { value: QuarterOfYear.QUY_2, label: 'Quý 2' },
    { value: QuarterOfYear.QUY_3, label: 'Quý 3' },
    { value: QuarterOfYear.QUY_4, label: 'Quý 4' }
]

export enum ElearningType {
    FREE = "FREE",
    MEMBER = "MEMBER",
    PAID = "PAID",
    COLLAB = "COLLAB",
    LECTURER = "LECTURER",
}
