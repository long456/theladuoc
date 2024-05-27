import {Component, HostListener, inject, Input, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-payment-check',
  templateUrl: './payment-check.component.html',
  styleUrls: ['./payment-check.component.scss']
})
export class PaymentCheckComponent implements OnInit{
  @Input() studentData?: any

  @HostListener('paste', ['$event']) onPaste(e: any) {
    const items = e.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      this.paymentForm.patchValue({ receiptImage: blob });
      this.paymentForm.get('file')?.updateValueAndValidity();
      this.nameFilePreview = blob.name;
      this.blobToDataUrl(blob);
    } else {
      this.message.error('Chưa có file nào được copy hoặc định dạng file copy không hợp lệ')
    }
  }

  readonly #modal = inject(NzModalRef);
  readonly nzModalData= inject(NZ_MODAL_DATA);

  paymentForm!: FormGroup;

  fileList: NzUploadFile[] = [];

  receiptImg!: any;

  nameFilePreview!: string;

  imgPreviewUrl!: string | ArrayBuffer | null | undefined;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      id: [null],
      ticketId: [null],
      name: [''],
      isPay: [0],
      price: [0],
      amountPaid: [0],
      receiptImage: [null]
    })
    if (this.nzModalData.studentData.price === null) {
      this.nzModalData.studentData.price = 0
    }
    this.paymentForm.patchValue(this.nzModalData.studentData)
  }

  formatterVnd(value: number): string {
    return `${value} VND`
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
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
    this.nameFilePreview = files[0].name
    this.blobToDataUrl(files[0]);
    this.paymentForm.patchValue({ receiptImage: files[0] });
    this.paymentForm.get('file')?.updateValueAndValidity();
  }
}
