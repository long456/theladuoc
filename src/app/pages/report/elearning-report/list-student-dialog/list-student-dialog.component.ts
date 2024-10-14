import { Component, Inject, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SpinnerService } from 'src/app/shared/services/spinner-service';
import { DateTimeHelper } from '../../helper/date-time-helper';
import { ReportListStudentResponse } from '../../model/report-list-studen-response';
import { ReportService } from '../../service/report.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-list-student-dialog',
  templateUrl: './list-student-dialog.component.html',
  styleUrls: ['./list-student-dialog.component.scss']
})
export class ListStudentDialogComponent implements OnInit {
  items: ReportListStudentResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItem: number = 0;
  isLoading: boolean = false;
  filter: any = {};
  dateFormat = 'dd/MM/yyyy';
  activeDate: any;
  studentName = '';
  studentPhone = '';
  studentEmail = '';
  studentCode = '';
  constructor(private reportService: ReportService,
    private dateTimeHelper: DateTimeHelper,
    private message: NzMessageService,
    private spinnerService: SpinnerService,
    private modal: NzModalRef<ListStudentDialogComponent>,
    @Inject(NZ_MODAL_DATA) public data: any) {
  }
  ngOnInit(): void {
    // this.onSearch();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.onSearch(sortField, sortOrder);
  }

  onPageChange(page: any) {
    this.currentPage = page;
    this.onSearch();
  }

  nzPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.onSearch();
  }

  clearStudentName() {
    this.studentName = '';
  }

  clearStudentPhone() {
    this.studentPhone = '';
  }

  clearStudentCode() {
    this.studentCode = '';
  }

  clearStudentEmail() {
    this.studentEmail = '';
  }

  onSearch(sortField: string | null = null, sortOrder: string | null = null) {
    this.isLoading = true;

    if (sortField && sortOrder) {
      this.filter.sortBy = `${sortField}-${sortOrder}`;
    } else {
      delete this.filter.sortBy;
    }

    this.filter = {
      ...this.data,
      studentCode: this.studentCode,
      studentEmail: this.studentEmail,
      studentName: this.studentName,
      studentPhone: this.studentPhone,
      activeDateFrom: this.activeDate ? this.dateTimeHelper.formatDate(this.activeDate[0]) : null,
      activeDateTo: this.activeDate ? this.dateTimeHelper.formatDate(this.activeDate[1]) : null
    };

    this.reportService.getStudentsByCourse(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.reportStudentsCourse.map((z: any) => plainToClass(ReportListStudentResponse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });;
  }

  exportExcel() {
    this.isLoading = true;
    this.filter = {
      ...this.data,
      studentCode: this.studentCode,
      studentEmail: this.studentEmail,
      studentName: this.studentName,
      studentPhone: this.studentPhone,
      activeDateFrom: this.activeDate ? this.dateTimeHelper.formatDate(this.activeDate[0]) : null,
      activeDateTo: this.activeDate ? this.dateTimeHelper.formatDate(this.activeDate[1]) : null
    };
    this.reportService.exportExcel(this.filter).subscribe(x => {
      if (x.data.length > 0) {
        let heading = [[
          'Ngày kích hoạt',
          'Tên học viên',
          'Số điện thoại',
          'Email',
          'Mã học viên',
        ]];
        //Had to create a new workbook and then add the header
        const wb = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

        var wscols = [
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
        ];
        ws["!cols"] = wscols;
        XLSX.utils.sheet_add_aoa(ws, heading, { cellStyles: true });
        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, x.data.map((z: any) => {
          return {
            activeDate: this.dateTimeHelper.formatDateTime(z.activeDate),
            studentName: z.studentName,
            studentPhone: z.studentPhone,
            studentEmail: z.studentEmail,
            studentCode: z.studentCode
          };
        }), { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Lịch sử thanh toán');

        ws['A1'].s = {
          fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: { rgb: "e8f0f8" },
            bgColor: { rgb: "e8f0f8" }
          },
          font: {
            name: 'Times New Roman',
            sz: 16,
            color: { rgb: "#FF000000" },
            bold: true,
            italic: false,
            underline: false
          },
          border: {
            top: { style: "thin", color: { auto: 1 } },
            right: { style: "thin", color: { auto: 1 } },
            bottom: { style: "thin", color: { auto: 1 } },
            left: { style: "thin", color: { auto: 1 } }
          }
        };

        let fileName = "Danh_Sach_Hoc_Vien_Dang_ky";
        if (this.data.numberOfLearners100Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_100"
        } else if (this.data.numberOfLearners90Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_90"
        }
        else if (this.data.numberOfLearners75Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_75"
        }
        else if (this.data.numberOfLearners50Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_50"
        }
        else if (this.data.numberOfLearners25Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_25"
        }
        else if (this.data.numberOfLearners5Percent == true) {
          fileName = "So_Hoc_Vien_Hoan_Thanh_5"
        }

        XLSX.writeFile(wb, `${fileName}.xlsx`);
        this.filter = {};
      } else {
        this.message.warning("Điều kiện bạn lọc không có dữ liệu xuất file excel, mời bạn lọc lại điều kiện phù hợp !")
      }

      this.isLoading = false;
    })
  }

  onClose() {
    this.modal.close();
  }
}
