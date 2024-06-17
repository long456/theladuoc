export class ReportFunnelCourse {
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
    funnelClassDate!: string;
    className!: string;
    numberPeopleTransferredEnough!: number;
    numberOfPeopleDepositing!: number;
    adsAmount!: number;
    cpa!: number;
    otherCost!: number;
    numberOfTicketsSold!: number;
    ticketSalesRevenue!: number;
    numberOfParticipants!: number;
}