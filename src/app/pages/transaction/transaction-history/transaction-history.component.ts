import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DialogFilterTransactionComponent } from '../dialog-filter-transaction/dialog-filter-transaction.component';
import { TransactionHistoryResponse } from '../model/transaction-history.model';
import { TransactionHistoryService } from '../service/transaction-history.service';

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
    private modal: NzModalService,) {

  }

  ngOnInit(): void {
    this.onSearch();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.onSearch(sortField, sortOrder);
  }

  onSearch(sortField: string | null = null, sortOrder: string | null = null) {
    this.isLoading = true;

    if (sortField && sortOrder) {
      this.filter.sortBy = `${sortField}-${sortOrder}`;
    } else {
      delete this.filter.sortBy;
    }
    this.transactionHistoryService.getTransactionHistory(this.currentPage, this.pageSize, this.filter).subscribe(x => {
      if (x) {
        this.items = x.data.transactionHistories.map((z: any) => plainToClass(TransactionHistoryResponse, z));
        this.totalItem = x.data.paginationInfo?.totalItem;
      }
      this.isLoading = false;
    });
  }

  onPageChange(page: any) {
    this.currentPage = page;
    this.onSearch();
  }

  nzPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.onSearch();
  }

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
      if (x) {
        this.filter = { ...x };
        this.onSearch();
      } else if (x == false) {
        this.filter = {};
        this.onSearch();
      }
    })
  }
}
