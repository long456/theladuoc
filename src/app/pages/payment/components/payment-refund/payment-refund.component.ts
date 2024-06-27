import {Component, OnInit, TemplateRef} from '@angular/core';
import {COL_DATA_TYPE, filterItem} from "../../../../shared/models/Table";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PaymentRefundService} from "../../services/payment-refund.service";
import {NzImageService} from "ng-zorro-antd/image";
import {environment} from "../../../../../environments/environment";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {RefundRequestComponent} from "../../../student/components/refund-request/refund-request.component";

@Component({
  selector: 'app-payment-refund',
  templateUrl: './payment-refund.component.html',
  styleUrls: ['./payment-refund.component.scss']
})
export class PaymentRefundComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;

  paymentRefund$ !: Observable<{
    rows: any[],
    filter?: any,
    page: number;
    pageSize: number;
    rowTotal: number;
  }>;

  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  filterList$ = new BehaviorSubject(null);

  isExpand = false;

  listOfColumn: filterItem[] = [
    {
      title: 'Ngày yêu cầu',
      name: 'createdDate',
      type: "date-range"
    },
    {
      title: 'Tên học viên',
      name: 'name',
    },
    {
      title: 'Số điện thoại',
      name: 'mobile',
    },
    {
      title: 'Email',
      name: 'email',
    },
    {
      title: 'Nhân viên chăm sóc',
      name: 'caregiverName',
    },
    {
      title: 'Tài khoản hoàn tiền',
      name: 'bankAccountNumber',
    },
    {
      title: 'Tên chủ tài khoản',
      name: 'bankAccountFullName',
    },
    {
      title: 'Tên ngân hàng',
      name: 'bankName',
    },
    {
      title: 'Trạng thái',
      name: 'verifyPay',
      type: "select",
      value: true,
      data: [
        {
          label: 'Đã xác thực',
          key: true
        },
        {
          label: 'Chưa xác thực',
          key: false
        }
      ]
    },
  ];

  receiptImg!: any;

  nameFilePreview!: string;

  imgPreviewUrl!: string | ArrayBuffer | null | undefined;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private paymentRefundService: PaymentRefundService,
    private nzImageService: NzImageService,
    private modal :NzModalService,
  ) {}

  ngOnInit() {
    this.paymentRefund$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.filterList$
    ])
    .pipe(
      tap(() => this.loading = true),
      mergeMap(([page, pageSize, filter]) => {
        return this.paymentRefundService.getListRefund(page, pageSize, filter)
          .pipe(
            map((value) => {
              return {
                rows: value.data.paymentRefunds,
                page: value.data.paginationInfo.pageCurrent,
                pageSize: value.data.paginationInfo.pageSize,
                rowTotal: value.data.paginationInfo.totalItem,
              }
            }),
            catchError(err => {
              this.message.error('Lỗi load dữ liệu yêu cầu hoàn tiền');
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

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.filterList$.next(event)
  }

  showImg(data: any) {
    this.paymentRefundService.getListImgRefund(data.id).subscribe({
      next: res => {
        if (res.success) {
          const baseUrl = environment.baseImgUrl;
          const listImg: any[] = [];
          res.data.forEach((item: any) => {
            const img = {
              src: baseUrl + item
            }
            listImg.push(img);
          });
          this.nzImageService.preview(listImg, { nzZoom: 1, nzRotate: 0 });
        } else {
          this.message.error('Lỗi load dữ liệu ảnh hoàn tiền');
        }
      },
      error: err => {

      }
    })


  }

  verifyPayment(data: any, tplContent: TemplateRef<{}>) {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Xác nhận hoàn tiền',
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

        this.paymentRefundService.verifyRefund(dataRefund).subscribe({
          next: res => {
            if (res.success) {
              this.pageSize$.next(10)
              this.message.success(res.messages)
            } else {
              this.message.error(res.errorMessages)
            }
          },
          error: err => {}
        })
      }
    })

  }

  blobToDataUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreviewUrl = e.target?.result;
    }
    reader.readAsDataURL(file)
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name;
    this.receiptImg = files[0];
    this.blobToDataUrl(files[0]);
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
}

