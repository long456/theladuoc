export class ReportListStudentResponse {
    
    userId!: number;

    /// <summary>
    /// Ngày kích hoạt
    /// </summary>
    activeDate!: Date;

    /// <summary>
    /// Tên học viên
    /// </summary>
    studentName!: string;

    /// <summary>
    /// Số điện thoại học viên
    /// </summary>
    studentPhone!: string;

    /// <summary>
    /// Email học viên
    /// </summary>
    studentEmail!: string;

    /// <summary>
    /// Mã học viên
    /// </summary>
    studentCode!: string;
}