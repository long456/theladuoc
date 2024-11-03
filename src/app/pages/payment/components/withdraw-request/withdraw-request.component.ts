import {Component, OnInit, TemplateRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {WithdrawRequestService} from "../../services/withdraw-request.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.scss']
})
export class WithdrawRequestComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;
  loading = false;
  withdrawRequest$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);
  refreshTrigger$ = new BehaviorSubject<void>(undefined);


  receiptImg!: any;
  nameFilePreview!: string;
  imgPreviewUrl!: string | ArrayBuffer | null | undefined;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private withdrawRequestService: WithdrawRequestService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.withdrawRequest$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$,
      this.refreshTrigger$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.withdrawRequestService.getListRefund(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.withdrawMoneys,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu yêu cầu rút tiền');
              return of({
                rows: [],
                page: 0,
                pageSize: 0,
                rowTotal: 0
              });
            })
          )
      }),
      delay(200),
      tap(() => this.loading = false),
    )
  }

  refreshData():void {
    // Load lại trang danh sách
    this.refreshTrigger$.next();
  }

  activeWithdraw(data: any, tplContent: TemplateRef<{}>): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Xác nhận rút tiền',
      nzContent: tplContent,
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modal.destroy()
        },
        {
          label: 'Xác nhận',
          type: 'primary',
          onClick: () => {
            if (this.receiptImg) {
              modal.triggerOk().then();
            } else {
              this.message.error('Lỗi chưa upload ảnh ủy nhiệm chi');
            }
          }
        }
      ],
      nzOnOk: instance => {
        const dataRefund = new FormData;
        dataRefund.append('id', data.id);
        dataRefund.append('receiptImage', this.receiptImg);

        this.withdrawRequestService.activeWithdraw(dataRefund).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.refreshData();
            } else {
              this.message.error(res.errorMessages);
            }
          }
        })
      }
    })
  }

  cancelWithdraw(data: any): void {
    this.modal.confirm({
      nzTitle: 'Hủy yêu cầu rút tiền',
      nzContent: 'Bạn có chắc muốn hủy yêu cầu rút tiền này?',
      nzOnOk: () => {
        this.withdrawRequestService.cancelWithdraw(data.id).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.refreshData();
            } else {
              this.message.error(res.errorMessages);
            }
          }
        })
      }
    });
  }

  blobToDataUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreviewUrl = e.target?.result;
    }
    reader.readAsDataURL(file)
  }

  onPaste(e: any) {
    const data = e.clipboardData.items;
    let blob = null;

    for (const item of data) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      this.receiptImg = blob;
      this.nameFilePreview = blob.name;
      this.blobToDataUrl(blob);
    } else {
      this.message.error('Chưa có file nào được copy hoặc định dạng file copy không hợp lệ')
    }
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name;
    this.receiptImg = files[0];
    this.blobToDataUrl(files[0]);
  }
}
