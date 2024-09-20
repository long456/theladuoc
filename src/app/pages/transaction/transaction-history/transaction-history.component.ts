import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DialogFilterTransactionComponent } from '../dialog-filter-transaction/dialog-filter-transaction.component';
import { TransactionHistoryResponse } from '../model/transaction-history.model';
import { TransactionHistoryService } from '../service/transaction-history.service';
import * as XLSX from 'xlsx';
import { finalize } from 'rxjs';
import { DateTimeHelper } from '../../report/helper/date-time-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  items: TransactionHistoryResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItem: number = 0;
  filter: any = {};
  isLoading: boolean = false;

  myForm = new FormGroup({
    keySearch: new FormControl(null),
  });

  constructor(private transactionHistoryService: TransactionHistoryService,
    private modal: NzModalService,
    private dateTimeHelper: DateTimeHelper,
    private message: NzMessageService) {

  }

  ngOnInit(): void {
    this.onSearch(this.currentPage, this.pageSize);
  }

  exportExcel() {
    this.isLoading = true;
    this.transactionHistoryService.exportExcel(this.filter).subscribe(x => {
      if (x.data.length > 0) {
        let heading = [[
          'Ngày thanh toán',
          'Mã thành viên',
          'Tên thành viên',
          'Số điện thoại thành viên',
          'Email thành viên',
          'Hạng thành viên',
          'Gói thành viên',
          'Số tiền đã thanh toán',
          'Thuộc đại lý',
          'Tên người giới thiệu',
          'Số điện thoại người giới thiệu',
          'Email người giới thiệu',
          'Hạng thành viên người giới thiệu',
          'Số tài khoản người giới thiệu',
          'Ngân hàng người giới thiệu',
          'Chi nhánh ngân hàng người giới thiệu',
          'Phương thức thanh toán',
          'Trạng thái thanh toán',
          'Nhân viên chăm sóc',
          'Tổ chức'
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
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
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
            paymentDate: this.dateTimeHelper.formatDateTime(z.paymentDate),
            customerCode: z.customerCode,
            customerName: z.customerName,
            customerPhone: z.customerPhone,
            customerEmail: z.customerEmail,
            memberPolicyLevelName: z.memberPolicyLevelName,
            priceMemberPolicyTypeName: z.priceMemberPolicyTypeName,
            price: z.price,
            agencyName: z.agencyName,
            userReferralName: z.userReferralName,
            userReferralPhone: z.userReferralPhone,
            userReferralMail: z.userReferralMail,
            userReferralMemberPolicyLevelName: z.userReferralMemberPolicyLevelName,
            userReferralAccountNumber: z.userReferralAccountNumber,
            userReferralBankName: z.userReferralBankName,
            userReferralBankBranchName: z.userReferralBankBranchName,
            paymentMethodName: z.paymentMethodName,
            paymentStatusName: z.paymentStatusName,
            userCareName: z.userCareName,
            organizationName: z.organizationName
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

        XLSX.writeFile(wb, 'Lich_Su_Thanh_Toan.xlsx');
        this.filter = {};
      } else {
        this.message.warning("Điều kiện bạn lọc không có dữ liệu xuất file excel, mời bạn lọc lại điều kiện phù hợp !")
      }

      this.isLoading = false;
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.onSearch(pageIndex, pageSize, sortField, sortOrder);
  }

  onSearch(pageIndex: number = 1, pageSize: number = 10, sortField: string | null = null, sortOrder: string | null = null) {
    this.currentPage = pageIndex;
    this.pageSize = pageSize;
    this.isLoading = true;

    if (sortField && sortOrder) {
      this.filter.sortBy = `${sortField}-${sortOrder}`;
    } else {
      delete this.filter.sortBy;
    }

    this.transactionHistoryService.getTransactionHistory(pageIndex, pageSize, this.filter).subscribe(x => {
      this.items = x.data.transactionHistories.map((z: any) => plainToClass(TransactionHistoryResponse, z));
      this.totalItem = x.data.paginationInfo?.totalItem;
      this.isLoading = false;
    });
  }

  // onPageChange(page: any) {
  //   this.currentPage = page;
  //   this.onSearch();
  // }

  // nzPageSizeChange(pageSize: number) {
  //   this.pageSize = pageSize;
  //   this.currentPage = 1;
  //   this.onPageChange(this.currentPage);
  // }

  openFilter() {
    // this.resetForm();
    const modal: NzModalRef = this.modal.create<DialogFilterTransactionComponent>({
      nzTitle: 'Tìm kiếm lịch sử khóa học',
      nzContent: DialogFilterTransactionComponent,
      nzFooter: null,
      nzWidth: '50%',
      nzData: {
        filter: this.filter
      },
      nzMaskClosable: false
    });

    modal.afterClose.subscribe(x => {
      console.log(x);
      if (x.isExportExcel) {
        this.filter = { ...x.dataFilter };
        this.exportExcel();
      } else {
        if (x.dataFilter) {
          this.filter = { ...x.dataFilter };
          this.onSearch();
        } else if (x == false) {
          this.filter = {};
          this.onSearch();
        }
      }
    })
  }
}
