export class ReportFunnelCourse {
    courseId!: number;
    totalAdsAmount!: number;
    totalNumberOfRegistrations!: number;
    totalCpa!: number;
    totalOtherCost!: number;
    totalRegistrationTicketNumber!: number;
    totalNumberOfTicketsSold!: number;
    totalTicketSalesRevenue!: number;
    totalNumberOfParticipants!: number;
    totalNumberOfPeopleDepositing!: number;
    totalNumberPeopleTransferredEnough!: number;
    courseRevenue!: number;
    courseProfits!: number;
    funnelCourseDate!: string;
    courseName!: string;
    speakerName!: string;
    phoneNumber!: string;
    organizationName!: string;
    listReportClassResponse: ReportClassResponse[] = [];
}

export class ReportClassResponse {
    classId!: number;
    funnelClassDate!: string;
    className!: string;
    numberPeopleTransferredEnough!: number;
    numberOfPeopleDepositing!: number;
    numberOfTicketsSold!: number;
    numberOfParticipants!: number;
    numberOfRegistrations!: number;
    adsAmount!: number;
    cpa!: number;
    otherCost!: number;
    ticketSalesRevenue!: number;
}